package com.mamaafrica.ai.market.dto;

import com.mamaafrica.ai.market.Product;

import java.time.Instant;
import java.util.List;

/**
 * Full product payload. {@code price} is a decimal for display convenience; {@code priceCents}
 * is the authoritative value and the one an editor writes back.
 */
public record ProductResponse(
        Long id,
        Integer legacyId,
        String slug,
        String name,
        String bornDay,
        String collection,
        String type,
        String label,
        String tagline,
        String cardBlurb,
        String description,
        int priceCents,
        String price,
        String currency,
        String image,
        List<String> images,
        List<String> sizes,
        List<String> details,
        List<String> perfectFor,
        List<SizeChartRowDto> sizeChart,
        String amazonUrl,
        String etsyUrl,
        String printifyUrl,
        boolean soldOut,
        boolean active,
        boolean featured,
        int sortOrder,
        Instant updatedAt,
        String updatedBy
) {

    public static ProductResponse from(Product p) {
        return new ProductResponse(
                p.getId(), p.getLegacyId(), p.getSlug(), p.getName(), p.getBornDay(), p.getCollection(),
                p.getProductType(), p.getTypeLabel(), p.getTagline(), p.getCardBlurb(), p.getDescription(),
                p.getPriceCents(), formatPrice(p.getPriceCents()), p.getCurrency(),
                p.getPrimaryImage(),
                List.copyOf(p.getImages()),
                List.copyOf(p.getSizes()),
                List.copyOf(p.getDetails()),
                List.copyOf(p.getPerfectFor()),
                p.getSizeChart().stream().map(SizeChartRowDto::from).toList(),
                p.getAmazonUrl(), p.getEtsyUrl(), p.getPrintifyUrl(),
                p.isSoldOut(), p.isActive(), p.isFeatured(), p.getSortOrder(),
                p.getUpdatedAt(), p.getUpdatedBy());
    }

    private static String formatPrice(int cents) {
        return String.format("%d.%02d", cents / 100, Math.abs(cents % 100));
    }
}
