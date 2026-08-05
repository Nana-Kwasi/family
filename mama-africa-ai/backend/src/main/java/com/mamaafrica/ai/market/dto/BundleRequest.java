package com.mamaafrica.ai.market.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record BundleRequest(
        @NotBlank @Size(max = 255) String title,
        @Size(max = 200) String slug,
        @Size(max = 255) String subtitle,
        String description,
        Boolean active,
        Integer sortOrder,
        /** Product ids, in the order they should appear in the set. */
        @NotEmpty List<Long> productIds
) {
}
