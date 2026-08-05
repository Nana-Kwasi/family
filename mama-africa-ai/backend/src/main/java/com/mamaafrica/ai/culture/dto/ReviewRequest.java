package com.mamaafrica.ai.culture.dto;

import com.mamaafrica.ai.culture.ReviewSubject;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ReviewRequest(
        @NotNull ReviewSubject subject,
        /** Required for STORY and DIASPORA; ignored for BOOK. */
        Long subjectId,
        @Size(max = 255) String subjectTitle,
        @Size(max = 120) String name,
        @Min(1) @Max(5) int rating,
        @Size(max = 5000) String comment
) {
}
