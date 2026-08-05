package com.mamaafrica.ai.market.dto;

import com.mamaafrica.ai.market.Product;

import java.time.Instant;

/** Row shape for the admin product table — no child collections, so the list query stays flat. */
public record ProductSummary(
        Long id,
        Integer legacyId,
        String slug,
        String name,
        String bornDay,
        String collection,
        String type,
        String label,
        int priceCents,
        String image,
        boolean soldOut,
        boolean active,
        boolean featured,
        int sortOrder,
        Instant updatedAt
) {

    public static ProductSummary from(Product p) {
        return new ProductSummary(
                p.getId(), p.getLegacyId(), p.getSlug(), p.getName(), p.getBornDay(), p.getCollection(),
                p.getProductType(), p.getTypeLabel(), p.getPriceCents(), p.getPrimaryImage(),
                p.isSoldOut(), p.isActive(), p.isFeatured(), p.getSortOrder(), p.getUpdatedAt());
    }
}
