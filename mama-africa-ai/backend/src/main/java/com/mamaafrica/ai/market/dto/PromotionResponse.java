package com.mamaafrica.ai.market.dto;

import com.mamaafrica.ai.market.Promotion;
import com.mamaafrica.ai.market.PromotionPlacement;
import com.mamaafrica.ai.market.PromotionTarget;

import java.time.Instant;

public record PromotionResponse(
        Long id,
        String slug,
        String headline,
        String body,
        String badgeLabel,
        PromotionPlacement placement,
        String ctaLabel,
        String ctaUrl,
        PromotionTarget targetType,
        String targetValue,
        Integer discountPct,
        Instant startsAt,
        Instant endsAt,
        boolean active,
        boolean live,
        int sortOrder,
        Instant updatedAt,
        String updatedBy
) {

    public static PromotionResponse from(Promotion p) {
        return new PromotionResponse(
                p.getId(), p.getSlug(), p.getHeadline(), p.getBody(), p.getBadgeLabel(), p.getPlacement(),
                p.getCtaLabel(), p.getCtaUrl(), p.getTargetType(), p.getTargetValue(), p.getDiscountPct(),
                p.getStartsAt(), p.getEndsAt(), p.isActive(), p.isLiveAt(Instant.now()), p.getSortOrder(),
                p.getUpdatedAt(), p.getUpdatedBy());
    }
}
