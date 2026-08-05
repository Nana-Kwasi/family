package com.mamaafrica.ai.knowledge.dto;

import com.mamaafrica.ai.knowledge.DocumentStatus;
import com.mamaafrica.ai.knowledge.KnowledgeDocument;

import java.time.Instant;
import java.util.UUID;

public record KnowledgeDocumentResponse(
        UUID id,
        String title,
        String fileName,
        String contentType,
        long sizeBytes,
        CategoryResponse category,
        int chunkCount,
        DocumentStatus status,
        String errorMessage,
        String uploadedBy,
        Instant createdAt,
        Instant updatedAt
) {

    public static KnowledgeDocumentResponse from(KnowledgeDocument document) {
        return new KnowledgeDocumentResponse(
                document.getId(), document.getTitle(), document.getFileName(), document.getContentType(),
                document.getSizeBytes(), CategoryResponse.from(document.getCategory()), document.getChunkCount(),
                document.getStatus(), document.getErrorMessage(), document.getUploadedBy(),
                document.getCreatedAt(), document.getUpdatedAt());
    }
}
