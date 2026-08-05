package com.mamaafrica.ai.knowledge;

import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.knowledge.dto.KnowledgeDocumentDetail;
import com.mamaafrica.ai.knowledge.dto.KnowledgeDocumentResponse;
import com.mamaafrica.ai.knowledge.dto.UpdateDocumentRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class KnowledgeService {

    private static final Logger log = LoggerFactory.getLogger(KnowledgeService.class);

    private final KnowledgeDocumentRepository documents;
    private final KnowledgeCategoryRepository categories;
    private final DocumentTextExtractor extractor;
    private final KnowledgeIndexer indexer;
    private final ApplicationEventPublisher events;

    public KnowledgeService(KnowledgeDocumentRepository documents,
                            KnowledgeCategoryRepository categories,
                            DocumentTextExtractor extractor,
                            KnowledgeIndexer indexer,
                            ApplicationEventPublisher events) {
        this.documents = documents;
        this.categories = categories;
        this.extractor = extractor;
        this.indexer = indexer;
        this.events = events;
    }

    /** Extracts text synchronously so bad files fail fast, then indexes in the background. */
    @Transactional
    public KnowledgeDocumentResponse upload(MultipartFile file, String title, String categorySlug, String uploadedBy) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("No file was uploaded");
        }

        var text = extractor.extract(file);
        var category = categorySlug == null || categorySlug.isBlank() ? null : requireCategory(categorySlug);
        var resolvedTitle = (title == null || title.isBlank()) ? file.getOriginalFilename() : title.trim();

        var document = documents.save(new KnowledgeDocument(
                resolvedTitle, file.getOriginalFilename(), file.getContentType(),
                file.getSize(), category, text, uploadedBy));

        log.info("Uploaded document {} ('{}'), {} characters — queued for indexing",
                document.getId(), resolvedTitle, text.length());
        requestIndexing(document.getId());

        return KnowledgeDocumentResponse.from(document);
    }

    public Page<KnowledgeDocumentResponse> list(String query, Long categoryId, Pageable pageable) {
        var normalised = (query == null || query.isBlank()) ? "" : query.trim();
        return documents.search(normalised, categoryId, pageable).map(KnowledgeDocumentResponse::from);
    }

    public KnowledgeDocumentDetail get(UUID id) {
        return KnowledgeDocumentDetail.from(require(id));
    }

    @Transactional
    public KnowledgeDocumentResponse update(UUID id, UpdateDocumentRequest request) {
        var document = require(id);
        var category = request.categorySlug() == null || request.categorySlug().isBlank()
                ? null
                : requireCategory(request.categorySlug());

        document.reclassify(request.title().trim(), category);
        documents.save(document);

        // Category and title live in the vector metadata, so the chunks must be rewritten.
        requestIndexing(id);
        return KnowledgeDocumentResponse.from(document);
    }

    @Transactional
    public void delete(UUID id) {
        var document = require(id);
        indexer.removeVectors(id);
        documents.delete(document);
        log.info("Deleted document {} ('{}')", id, document.getTitle());
    }

    public void reindex(UUID id) {
        require(id);
        requestIndexing(id);
    }

    /** Queues every document. Used after changing chunk settings or the embedding model. */
    public int reindexAll() {
        var all = documents.findAllByOrderByCreatedAtAsc();
        all.forEach(document -> requestIndexing(document.getId()));
        log.info("Queued {} documents for re-indexing", all.size());
        return all.size();
    }

    public long countDocuments() {
        return documents.count();
    }

    public long countByStatus(DocumentStatus status) {
        return documents.countByStatus(status);
    }

    /** Package-private rather than private: the site-guide seeder queues its document too. */
    void requestIndexing(UUID documentId) {
        events.publishEvent(new DocumentIndexRequested(documentId));
    }

    private KnowledgeDocument require(UUID id) {
        return documents.findById(id)
                .orElseThrow(() -> new NotFoundException("Document not found: " + id));
    }

    private KnowledgeCategory requireCategory(String slug) {
        return categories.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Category not found: " + slug));
    }
}
