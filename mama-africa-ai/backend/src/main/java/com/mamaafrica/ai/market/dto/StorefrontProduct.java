package com.mamaafrica.ai.market.dto;

import com.mamaafrica.ai.market.Product;

import java.util.List;

/**
 * The website's product shape. Deliberately mirrors the object the old
 * <code>src/data/products.js</code> exported — same field names, same types — so the store
 * components did not have to be rewritten when the catalogue moved into the database.
 *
 * <p>{@code id} is the legacy numeric id where one exists, keeping /product/:id links alive;
 * {@code slug} is the identifier to prefer in new code.
 */
public record StorefrontProduct(
        Object id,
        String slug,
        String name,
        String bornDay,
        String collection,
        String tagline,
        String cardBlurb,
        String description,
        double price,
        String image,
        List<String> images,
        List<String> sizes,
        List<SizeChartRowDto> sizeChart,
        List<String> perfectFor,
        List<String> details,
        String type,
        String label,
        String amazonUrl,
        String etsyUrl,
        String printifyUrl,
        boolean soldOut,
        boolean featured
) {

    public static StorefrontProduct from(Product p) {
        return new StorefrontProduct(
                p.getLegacyId() != null ? p.getLegacyId() : p.getId(),
                p.getSlug(),
                p.getName(),
                p.getBornDay(),
                p.getCollection(),
                p.getTagline(),
                p.getCardBlurb(),
                p.getDescription(),
                p.getPriceCents() / 100.0,
                p.getPrimaryImage(),
                List.copyOf(p.getImages()),
                List.copyOf(p.getSizes()),
                p.getSizeChart().stream().map(SizeChartRowDto::from).toList(),
                List.copyOf(p.getPerfectFor()),
                List.copyOf(p.getDetails()),
                p.getProductType(),
                p.getTypeLabel(),
                p.getAmazonUrl(),
                p.getEtsyUrl(),
                p.getPrintifyUrl(),
                p.isSoldOut(),
                p.isFeatured());
    }
}
