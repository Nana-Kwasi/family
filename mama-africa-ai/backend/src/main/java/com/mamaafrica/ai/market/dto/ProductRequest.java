package com.mamaafrica.ai.market.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * Create/update payload for a product. {@code slug} is optional on create — it is derived
 * from the name and de-duplicated server-side.
 */
public record ProductRequest(
        @NotBlank @Size(max = 255) String name,
        @Size(max = 200) String slug,
        @Pattern(regexp = "Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday",
                message = "must be a day of the week")
        String bornDay,
        @Size(max = 120) String collection,
        @NotBlank @Size(max = 32) String type,
        @NotBlank @Size(max = 64) String label,
        @Size(max = 255) String tagline,
        @Size(max = 255) String cardBlurb,
        String description,
        @Min(0) @Max(100_000_00) int priceCents,
        @Size(max = 3) String currency,
        @Size(max = 500) String image,
        List<@Size(max = 500) String> images,
        List<@Size(max = 32) String> sizes,
        List<@Size(max = 255) String> details,
        List<@Size(max = 255) String> perfectFor,
        @Valid List<SizeChartRowDto> sizeChart,
        @Size(max = 1000) String amazonUrl,
        @Size(max = 1000) String etsyUrl,
        @Size(max = 1000) String printifyUrl,
        boolean soldOut,
        Boolean active,
        boolean featured,
        Integer sortOrder
) {
}
