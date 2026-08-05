package com.mamaafrica.ai.knowledge.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateDocumentRequest(
        @NotBlank @Size(max = 255) String title,
        String categorySlug
) {
}
