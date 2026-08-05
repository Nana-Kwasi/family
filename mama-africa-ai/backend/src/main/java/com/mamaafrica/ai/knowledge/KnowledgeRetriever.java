package com.mamaafrica.ai.knowledge;

import com.mamaafrica.ai.settings.SettingsService;
import com.mamaafrica.ai.knowledge.dto.KnowledgeSearchResult;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingMatch;
import dev.langchain4j.store.embedding.EmbeddingSearchRequest;
import dev.langchain4j.store.embedding.EmbeddingStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

import static dev.langchain4j.store.embedding.filter.MetadataFilterBuilder.metadataKey;

/** Similarity search over the knowledge base — used by the chat pipeline and by the admin console. */
@Service
public class KnowledgeRetriever {

    private static final Logger log = LoggerFactory.getLogger(KnowledgeRetriever.class);
    private static final int EXCERPT_MAX_LENGTH = 300;

    private final EmbeddingModel embeddingModel;
    private final EmbeddingStore<TextSegment> embeddingStore;
    private final SettingsService settings;

    public KnowledgeRetriever(EmbeddingModel embeddingModel,
                              EmbeddingStore<TextSegment> embeddingStore,
                              SettingsService settings) {
        this.embeddingModel = embeddingModel;
        this.embeddingStore = embeddingStore;
        this.settings = settings;
    }

    /**
     * Chunks to inject into the prompt. Returns empty when RAG is disabled or nothing is
     * relevant enough — the model then answers from its general knowledge, as the system prompt says.
     *
     * <p>Never throws: a knowledge-base outage must degrade the answer, not break the chat.
     */
    public List<String> retrieveContext(String question) {
        var current = settings.effective();
        if (!current.ragEnabled()) {
            return List.of();
        }
        try {
            return search(question, null, current.maxResults(), current.minScore()).stream()
                    .map(match -> match.embedded().text())
                    .toList();
        } catch (RuntimeException e) {
            log.warn("Knowledge retrieval failed, answering without context: {}", e.getMessage());
            return List.of();
        }
    }

    /** Admin-console search, with optional category filter and human-readable results. */
    public List<KnowledgeSearchResult> searchDocuments(String query, String categorySlug, int maxResults) {
        return search(query, categorySlug, maxResults, 0.0).stream()
                .map(match -> new KnowledgeSearchResult(
                        match.embedded().metadata().getString(KnowledgeIndexer.DOCUMENT_ID_KEY),
                        match.embedded().metadata().getString(KnowledgeIndexer.TITLE_KEY),
                        match.embedded().metadata().getString(KnowledgeIndexer.CATEGORY_KEY),
                        excerpt(match.embedded().text()),
                        match.score()))
                .toList();
    }

    private List<EmbeddingMatch<TextSegment>> search(String query, String categorySlug,
                                                     int maxResults, double minScore) {
        var request = EmbeddingSearchRequest.builder()
                .queryEmbedding(embeddingModel.embed(query).content())
                .maxResults(maxResults)
                .minScore(minScore);

        if (categorySlug != null && !categorySlug.isBlank()) {
            request.filter(metadataKey(KnowledgeIndexer.CATEGORY_KEY).isEqualTo(categorySlug));
        }

        return embeddingStore.search(request.build()).matches();
    }

    private static String excerpt(String text) {
        var single = text.strip().replaceAll("\\s+", " ");
        return single.length() <= EXCERPT_MAX_LENGTH ? single : single.substring(0, EXCERPT_MAX_LENGTH) + "…";
    }
}
