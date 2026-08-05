package com.mamaafrica.ai.market;

import com.mamaafrica.ai.market.dto.BundleResponse;
import com.mamaafrica.ai.market.dto.PromotionResponse;
import com.mamaafrica.ai.market.dto.StorefrontProduct;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * The website's read-only view of the Market. Public — no JWT — because it renders the shop
 * to anonymous visitors. Only active products are ever exposed; drafts stay in the console.
 */
@RestController
@RequestMapping("/api/storefront")
@Tag(name = "Storefront (public)")
public class StorefrontController {

    private final ProductRepository products;
    private final BundleService bundleService;
    private final PromotionService promotionService;
    private final ProductService productService;

    public StorefrontController(ProductRepository products,
                                BundleService bundleService,
                                PromotionService promotionService,
                                ProductService productService) {
        this.products = products;
        this.bundleService = bundleService;
        this.promotionService = promotionService;
        this.productService = productService;
    }

    /**
     * The whole shop in one call. The catalogue is small (under a hundred products) and every
     * store screen filters it client-side, so paging it would cost a round trip per view for
     * no benefit.
     *
     * <p>{@code no-cache} means "revalidate before reuse", not "never store". An admin edit
     * must show up on the next page load — a max-age here would leave the shop stale for as
     * long as it ran, which is exactly what moving the catalogue into the console was meant
     * to stop. {@code ShallowEtagHeaderFilter} turns each revalidation into a 304 whenever
     * nothing has changed, so the usual cost is a header exchange rather than the payload.
     */
    @GetMapping("/catalog")
    @Operation(summary = "Active products, bundles and live promotions in one payload")
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> catalog() {
        var items = products.findAllForStorefront().stream().map(StorefrontProduct::from).toList();
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noCache())
                .body(Map.of(
                        "products", items,
                        "bundles", bundleService.listActive(),
                        "promotions", promotionService.listLive()));
    }

    @GetMapping("/products")
    @Operation(summary = "Active products only")
    @Transactional(readOnly = true)
    public ResponseEntity<List<StorefrontProduct>> listProducts() {
        return ResponseEntity.ok(products.findAllForStorefront().stream().map(StorefrontProduct::from).toList());
    }

    @GetMapping("/products/{slugOrId}")
    @Operation(summary = "One product, by slug or by its pre-migration numeric id")
    public ResponseEntity<StorefrontProduct> getProduct(@PathVariable String slugOrId) {
        return ResponseEntity.ok(productService.getStorefrontProduct(slugOrId));
    }

    @GetMapping("/bundles")
    @Operation(summary = "Active bundles")
    public ResponseEntity<List<BundleResponse>> listBundles() {
        return ResponseEntity.ok(bundleService.listActive());
    }

    @GetMapping("/bundles/{slug}")
    @Operation(summary = "One bundle with its products")
    public ResponseEntity<BundleResponse> getBundle(@PathVariable String slug) {
        return ResponseEntity.ok(bundleService.getBySlug(slug));
    }

    @GetMapping("/promotions")
    @Operation(summary = "Promotions that are live right now")
    public ResponseEntity<List<PromotionResponse>> listPromotions() {
        return ResponseEntity.ok(promotionService.listLive());
    }
}
