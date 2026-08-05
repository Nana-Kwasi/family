package com.mamaafrica.ai.market;

import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.market.dto.BundleRequest;
import com.mamaafrica.ai.market.dto.BundleResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BundleService {

    private final BundleRepository bundles;
    private final ProductRepository products;

    public BundleService(BundleRepository bundles, ProductRepository products) {
        this.bundles = bundles;
        this.products = products;
    }

    @Transactional(readOnly = true)
    public List<BundleResponse> list() {
        return bundles.findAllOrdered().stream().map(BundleResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<BundleResponse> listActive() {
        return bundles.findActiveOrdered().stream().map(BundleResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public BundleResponse get(Long id) {
        return BundleResponse.from(bundles.findWithItemsById(id)
                .orElseThrow(() -> new NotFoundException("Bundle " + id + " not found")));
    }

    @Transactional(readOnly = true)
    public BundleResponse getBySlug(String slug) {
        return BundleResponse.from(bundles.findWithItemsBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Bundle " + slug + " not found")));
    }

    @Transactional
    public BundleResponse create(BundleRequest request) {
        var bundle = new Bundle();
        apply(bundle, request);
        bundle.setSlug(uniqueSlug(request.slug(), request.title(), null));
        return BundleResponse.from(bundles.save(bundle));
    }

    @Transactional
    public BundleResponse update(Long id, BundleRequest request) {
        var bundle = bundles.findWithItemsById(id)
                .orElseThrow(() -> new NotFoundException("Bundle " + id + " not found"));
        apply(bundle, request);
        bundle.setSlug(uniqueSlug(request.slug(), request.title(), bundle.getSlug()));
        return BundleResponse.from(bundles.save(bundle));
    }

    @Transactional
    public void delete(Long id) {
        if (!bundles.existsById(id)) {
            throw new NotFoundException("Bundle " + id + " not found");
        }
        bundles.deleteById(id);
    }

    private void apply(Bundle bundle, BundleRequest r) {
        bundle.setTitle(r.title().trim());
        bundle.setSubtitle(blankToNull(r.subtitle()));
        bundle.setDescription(blankToNull(r.description()));
        if (r.active() != null) {
            bundle.setActive(r.active());
        }
        if (r.sortOrder() != null) {
            bundle.setSortOrder(r.sortOrder());
        }

        // Resolve every id up front so a bad one fails the whole request rather than
        // silently producing a short bundle.
        var resolved = new ArrayList<Product>(r.productIds().size());
        for (Long productId : r.productIds()) {
            resolved.add(products.findById(productId)
                    .orElseThrow(() -> new BadRequestException("Product " + productId + " does not exist")));
        }
        if (resolved.stream().map(Product::getId).distinct().count() != resolved.size()) {
            throw new BadRequestException("A bundle cannot list the same product twice");
        }
        bundle.getItems().clear();
        bundle.getItems().addAll(resolved);
        bundle.touch();
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }

    private String uniqueSlug(String requested, String title, String currentSlug) {
        String base = Product.toSlug((requested == null || requested.isBlank()) ? title : requested);
        if (base.isEmpty()) {
            throw new BadRequestException("Cannot derive a slug from '" + title + "'");
        }
        if (base.equals(currentSlug)) {
            return base;
        }
        String candidate = base;
        int suffix = 2;
        while (bundles.existsBySlug(candidate)) {
            candidate = base + "-" + suffix++;
        }
        return candidate;
    }
}
