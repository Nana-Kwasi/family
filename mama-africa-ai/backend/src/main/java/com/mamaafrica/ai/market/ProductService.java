package com.mamaafrica.ai.market;

import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.market.dto.ProductRequest;
import com.mamaafrica.ai.market.dto.ProductResponse;
import com.mamaafrica.ai.market.dto.ProductSummary;
import com.mamaafrica.ai.market.dto.StorefrontProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository products;

    public ProductService(ProductRepository products) {
        this.products = products;
    }

    @Transactional(readOnly = true)
    public Page<ProductSummary> list(String search, String bornDay, String type, Boolean active, Pageable pageable) {
        // Build the LIKE pattern here so a blank filter arrives as a real null rather than
        // as LOWER(null), which PostgreSQL rejects for an untyped parameter.
        String pattern = (search == null || search.isBlank())
                ? null
                : "%" + search.trim().toLowerCase(Locale.ROOT) + "%";
        return products.search(pattern, blankToNull(bornDay), blankToNull(type), active, pageable)
                .map(ProductSummary::from);
    }

    @Transactional(readOnly = true)
    public ProductResponse get(Long id) {
        return ProductResponse.from(products.findWithDetailById(id)
                .orElseThrow(() -> new NotFoundException("Product " + id + " not found")));
    }

    /**
     * The storefront's single-product lookup. Resolves by slug first, then by the numeric id
     * the website used before the migration, so old /product/:id links keep working.
     *
     * <p>Inactive products are treated as missing: a draft must not be reachable by guessing
     * its URL just because it is absent from the listing.
     */
    @Transactional(readOnly = true)
    public StorefrontProduct getStorefrontProduct(String slugOrLegacyId) {
        var product = products.findWithDetailBySlug(slugOrLegacyId)
                .or(() -> parseLegacyId(slugOrLegacyId).flatMap(products::findWithDetailByLegacyId))
                .filter(Product::isActive)
                .orElseThrow(() -> new NotFoundException("Product " + slugOrLegacyId + " not found"));
        return StorefrontProduct.from(product);
    }

    private static Optional<Integer> parseLegacyId(String value) {
        try {
            return Optional.of(Integer.valueOf(value));
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }

    @Transactional
    public ProductResponse create(ProductRequest request, String actor) {
        var product = new Product();
        apply(product, request, actor);
        product.setSlug(uniqueSlug(request.slug(), request.name(), null));
        if (request.sortOrder() == null) {
            product.setSortOrder(products.maxSortOrder() + 1);
        }
        return ProductResponse.from(products.save(product));
    }

    @Transactional
    public ProductResponse update(Long id, ProductRequest request, String actor) {
        var product = products.findWithDetailById(id)
                .orElseThrow(() -> new NotFoundException("Product " + id + " not found"));
        apply(product, request, actor);
        product.setSlug(uniqueSlug(request.slug(), request.name(), product.getSlug()));
        return ProductResponse.from(products.save(product));
    }

    @Transactional
    public void delete(Long id) {
        if (!products.existsById(id)) {
            throw new NotFoundException("Product " + id + " not found");
        }
        products.deleteById(id);
    }

    /** Flips visibility without a full-body update — what the list view's toggle calls. */
    @Transactional
    public ProductResponse setActive(Long id, boolean active, String actor) {
        var product = products.findWithDetailById(id)
                .orElseThrow(() -> new NotFoundException("Product " + id + " not found"));
        product.setActive(active);
        product.touch(actor);
        return ProductResponse.from(products.save(product));
    }

    @Transactional
    public void reorder(List<Long> orderedIds, String actor) {
        for (int i = 0; i < orderedIds.size(); i++) {
            Long id = orderedIds.get(i);
            var product = products.findById(id)
                    .orElseThrow(() -> new NotFoundException("Product " + id + " not found"));
            product.setSortOrder(i);
            product.touch(actor);
            products.save(product);
        }
    }

    private void apply(Product product, ProductRequest r, String actor) {
        product.setName(r.name().trim());
        product.setBornDay(blankToNull(r.bornDay()));
        product.setCollection(blankToNull(r.collection()));
        product.setProductType(r.type().trim().toLowerCase(Locale.ROOT));
        product.setTypeLabel(r.label().trim());
        product.setTagline(blankToNull(r.tagline()));
        product.setCardBlurb(blankToNull(r.cardBlurb()));
        product.setDescription(blankToNull(r.description()));
        product.setPriceCents(r.priceCents());
        if (r.currency() != null && !r.currency().isBlank()) {
            product.setCurrency(r.currency().trim().toUpperCase(Locale.ROOT));
        }
        product.setAmazonUrl(blankToNull(r.amazonUrl()));
        product.setEtsyUrl(blankToNull(r.etsyUrl()));
        product.setPrintifyUrl(blankToNull(r.printifyUrl()));
        product.setSoldOut(r.soldOut());
        product.setFeatured(r.featured());
        if (r.active() != null) {
            product.setActive(r.active());
        }
        if (r.sortOrder() != null) {
            product.setSortOrder(r.sortOrder());
        }

        List<String> images = clean(r.images());
        // The card image must also be in the gallery, otherwise the detail page opens on an
        // image the visitor cannot navigate back to.
        String primary = blankToNull(r.image());
        if (primary == null && !images.isEmpty()) {
            primary = images.get(0);
        }
        if (primary != null && !images.contains(primary)) {
            images.add(0, primary);
        }
        product.setPrimaryImage(primary);

        replaceAll(product.getImages(), images);
        replaceAll(product.getSizes(), clean(r.sizes()));
        replaceAll(product.getDetails(), clean(r.details()));
        replaceAll(product.getPerfectFor(), clean(r.perfectFor()));

        var chart = r.sizeChart() == null
                ? List.<SizeChartRow>of()
                : r.sizeChart().stream().map(row -> row.toEntity()).toList();
        replaceAll(product.getSizeChart(), chart);

        product.touch(actor);
    }

    /**
     * Mutates the managed collection in place. Assigning a fresh list would detach the one
     * Hibernate tracks and throw on flush.
     */
    private static <T> void replaceAll(List<T> managed, List<T> values) {
        managed.clear();
        managed.addAll(values);
    }

    private static List<String> clean(List<String> values) {
        if (values == null) {
            return new ArrayList<>();
        }
        return values.stream()
                .filter(v -> v != null && !v.isBlank())
                .map(String::trim)
                .distinct()
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }

    /**
     * Derives a slug from the requested value (or the name) and appends -2, -3 … until it is
     * free. {@code currentSlug} is exempt so saving a product without renaming it is a no-op.
     */
    private String uniqueSlug(String requested, String name, String currentSlug) {
        String base = Product.toSlug((requested == null || requested.isBlank()) ? name : requested);
        if (base.isEmpty()) {
            throw new BadRequestException("Cannot derive a slug from '" + name + "'");
        }
        if (base.equals(currentSlug)) {
            return base;
        }
        String candidate = base;
        int suffix = 2;
        while (products.existsBySlug(candidate)) {
            candidate = base + "-" + suffix++;
        }
        return candidate;
    }
}
