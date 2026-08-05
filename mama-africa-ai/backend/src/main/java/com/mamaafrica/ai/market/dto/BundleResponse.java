package com.mamaafrica.ai.market.dto;

import com.mamaafrica.ai.market.Bundle;

import java.util.List;

public record BundleResponse(
        Long id,
        String slug,
        String title,
        String subtitle,
        String description,
        boolean active,
        int sortOrder,
        List<ProductSummary> items
) {

    public static BundleResponse from(Bundle b) {
        return new BundleResponse(
                b.getId(), b.getSlug(), b.getTitle(), b.getSubtitle(), b.getDescription(),
                b.isActive(), b.getSortOrder(),
                b.getItems().stream().map(ProductSummary::from).toList());
    }
}
