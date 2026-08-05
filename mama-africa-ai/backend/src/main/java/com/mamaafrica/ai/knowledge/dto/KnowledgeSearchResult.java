package com.mamaafrica.ai.knowledge.dto;

public record KnowledgeSearchResult(
        String documentId,
        String title,
        String category,
        String excerpt,
        double score
) {
}
