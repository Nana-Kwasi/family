package com.mamaafrica.ai.market.dto;

import com.mamaafrica.ai.market.PromotionPlacement;
import com.mamaafrica.ai.market.PromotionTarget;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record PromotionRequest(
        @NotBlank @Size(max = 255) String headline,
        @Size(max = 200) String slug,
        String body,
        @Size(max = 64) String badgeLabel,
        @NotNull PromotionPlacement placement,
        @Size(max = 64) String ctaLabel,
        @Size(max = 1000) String ctaUrl,
        PromotionTarget targetType,
        @Size(max = 200) String targetValue,
        @Min(0) @Max(100) Integer discountPct,
        Instant startsAt,
        Instant endsAt,
        Boolean active,
        Integer sortOrder
) {
}
