package com.mamaafrica.ai.knowledge.dto;

import com.mamaafrica.ai.knowledge.KnowledgeCategory;

public record CategoryResponse(Long id, String name, String slug, String description) {

    public static CategoryResponse from(KnowledgeCategory category) {
        return category == null ? null : new CategoryResponse(
                category.getId(), category.getName(), category.getSlug(), category.getDescription());
    }
}
