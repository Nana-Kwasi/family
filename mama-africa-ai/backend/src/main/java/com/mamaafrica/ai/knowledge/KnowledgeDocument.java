package com.mamaafrica.ai.knowledge;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "knowledge_documents")
public class KnowledgeDocument {

    private static final int ERROR_MAX_LENGTH = 1000;

    @Id
    private UUID id = UUID.randomUUID();

    @Column(nullable = false)
    private String title;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "content_type", length = 120)
    private String contentType;

    @Column(name = "size_bytes", nullable = false)
    private long sizeBytes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private KnowledgeCategory category;

    /** Extracted plain text — the source for (re-)indexing. */
    @Column(nullable = false, columnDefinition = "text")
    private String content;

    @Column(name = "chunk_count", nullable = false)
    private int chunkCount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private DocumentStatus status = DocumentStatus.PENDING;

    @Column(name = "error_message", length = ERROR_MAX_LENGTH)
    private String errorMessage;

    @Column(name = "uploaded_by")
    private String uploadedBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    protected KnowledgeDocument() {
    }

    public KnowledgeDocument(String title, String fileName, String contentType, long sizeBytes,
                             KnowledgeCategory category, String content, String uploadedBy) {
        this.title = title;
        this.fileName = fileName;
        this.contentType = contentType;
        this.sizeBytes = sizeBytes;
        this.category = category;
        this.content = content;
        this.uploadedBy = uploadedBy;
    }

    /** Swaps in new text for the same document, so its id and history are kept. */
    public void replaceContent(String content) {
        this.content = content;
        this.sizeBytes = content.getBytes(java.nio.charset.StandardCharsets.UTF_8).length;
        this.updatedAt = java.time.Instant.now();
    }

    public void markIndexing() {
        this.status = DocumentStatus.INDEXING;
        this.errorMessage = null;
        this.updatedAt = Instant.now();
    }

    public void markIndexed(int chunkCount) {
        this.status = DocumentStatus.INDEXED;
        this.chunkCount = chunkCount;
        this.errorMessage = null;
        this.updatedAt = Instant.now();
    }

    public void markFailed(String reason) {
        this.status = DocumentStatus.FAILED;
        this.chunkCount = 0;
        this.errorMessage = truncate(reason);
        this.updatedAt = Instant.now();
    }

    public void reclassify(String title, KnowledgeCategory category) {
        this.title = title;
        this.category = category;
        this.updatedAt = Instant.now();
    }

    private static String truncate(String reason) {
        if (reason == null) {
            return "Unknown error";
        }
        return reason.length() <= ERROR_MAX_LENGTH ? reason : reason.substring(0, ERROR_MAX_LENGTH);
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getFileName() {
        return fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public long getSizeBytes() {
        return sizeBytes;
    }

    public KnowledgeCategory getCategory() {
        return category;
    }

    public String getContent() {
        return content;
    }

    public int getChunkCount() {
        return chunkCount;
    }

    public DocumentStatus getStatus() {
        return status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public String getUploadedBy() {
        return uploadedBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
