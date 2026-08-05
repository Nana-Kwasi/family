package com.mamaafrica.ai.policy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PolicyRequest(
        @NotBlank @Size(max = 255) String title,
        @Size(max = 500) String summary,
        @NotBlank String body,
        boolean requiredAtSignup,
        Integer sortOrder
) {
}
