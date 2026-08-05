package com.mamaafrica.ai.knowledge;

import com.mamaafrica.ai.settings.SettingsService;
import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.Metadata;
import dev.langchain4j.data.document.splitter.DocumentSplitters;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import static dev.langchain4j.store.embedding.filter.MetadataFilterBuilder.metadataKey;

/**
 * Chunks a document, embeds the chunks and stores them in Qdrant.
 *
 * <p>Runs off the request thread: a large PDF takes far longer than an HTTP request should.
 * Progress is visible through {@link DocumentStatus} on the document row.
 */
@Service
public class KnowledgeIndexer {

    /** Chunks embedded per call — keeps memory flat on large documents. */
    private static final int EMBEDDING_BATCH_SIZE = 64;

    static final String DOCUMENT_ID_KEY = "documentId";
    static final String CATEGORY_KEY = "category";
    static final String TITLE_KEY = "title";

    private static final Logger log = LoggerFactory.getLogger(KnowledgeIndexer.class);

    private final KnowledgeDocumentRepository documents;
    private final EmbeddingModel embeddingModel;
    private final EmbeddingStore<TextSegment> embeddingStore;
    private final SettingsService settings;

    public KnowledgeIndexer(KnowledgeDocumentRepository documents,
                            EmbeddingModel embeddingModel,
                            EmbeddingStore<TextSegment> embeddingStore,
                            SettingsService settings) {
        this.documents = documents;
        this.embeddingModel = embeddingModel;
        this.embeddingStore = embeddingStore;
        this.settings = settings;
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, fallbackExecution = true)
    public void onIndexRequested(DocumentIndexRequested event) {
        index(event.documentId());
    }

    /** Synchronous entry point — also used when re-indexing and from tests. */
    public void index(UUID documentId) {
        var document = documents.findById(documentId).orElse(null);
        if (document == null) {
            log.warn("Document {} disappeared before indexing", documentId);
            return;
        }

        try {
            document.markIndexing();
            documents.save(document);

            removeVectors(documentId);
            var segments = split(document);
            embedAndStore(segments);

            document.markIndexed(segments.size());
            documents.save(document);
            log.info("Indexed document {} ('{}') into {} chunks", documentId, document.getTitle(), segments.size());

        } catch (Exception e) {
            log.error("Failed to index document {}", documentId, e);
            document.markFailed(e.getMessage());
            documents.save(document);
        }
    }

    /** Removes a document's chunks from the vector store. Safe to call for un-indexed documents. */
    public void removeVectors(UUID documentId) {
        embeddingStore.removeAll(metadataKey(DOCUMENT_ID_KEY).isEqualTo(documentId.toString()));
    }

    private List<TextSegment> split(KnowledgeDocument document) {
        var metadata = new HashMap<String, String>();
        metadata.put(DOCUMENT_ID_KEY, document.getId().toString());
        metadata.put(TITLE_KEY, document.getTitle());
        if (document.getCategory() != null) {
            metadata.put(CATEGORY_KEY, document.getCategory().getSlug());
        }

        var current = settings.effective();
        var splitter = DocumentSplitters.recursive(current.chunkSize(), current.chunkOverlap());
        return splitter.split(Document.from(document.getContent(), Metadata.from(metadata)));
    }

    private void embedAndStore(List<TextSegment> segments) {
        for (int start = 0; start < segments.size(); start += EMBEDDING_BATCH_SIZE) {
            var batch = segments.subList(start, Math.min(start + EMBEDDING_BATCH_SIZE, segments.size()));
            embeddingStore.addAll(embeddingModel.embedAll(batch).content(), batch);
        }
    }
}
