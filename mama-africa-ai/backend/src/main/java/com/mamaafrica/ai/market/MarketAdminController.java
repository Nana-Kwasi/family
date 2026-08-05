package com.mamaafrica.ai.market;

import com.mamaafrica.ai.market.dto.BundleRequest;
import com.mamaafrica.ai.market.dto.BundleResponse;
import com.mamaafrica.ai.market.dto.ProductRequest;
import com.mamaafrica.ai.market.dto.ProductResponse;
import com.mamaafrica.ai.market.dto.ProductSummary;
import com.mamaafrica.ai.market.dto.PromotionRequest;
import com.mamaafrica.ai.market.dto.PromotionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Everything the Mama Africa Market module in the admin console calls. Authentication is
 * enforced by the filter chain: these paths are outside PUBLIC_PATHS, so a JWT is required.
 */
@RestController
@RequestMapping("/api/market")
@Tag(name = "Market (admin)")
public class MarketAdminController {

    private static final int MAX_PAGE_SIZE = 200;

    private final ProductService productService;
    private final BundleService bundleService;
    private final PromotionService promotionService;
    private final ImageLibraryService imageLibrary;

    public MarketAdminController(ProductService productService,
                                 BundleService bundleService,
                                 PromotionService promotionService,
                                 ImageLibraryService imageLibrary) {
        this.productService = productService;
        this.bundleService = bundleService;
        this.promotionService = promotionService;
        this.imageLibrary = imageLibrary;
    }

    // ── Products ────────────────────────────────────────────────────────────

    @GetMapping("/products")
    @Operation(summary = "List products with optional search and filters")
    public ResponseEntity<Page<ProductSummary>> listProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String bornDay,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Boolean active,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        var pageable = PageRequest.of(Math.max(page, 0), Math.clamp(size, 1, MAX_PAGE_SIZE),
                Sort.by("sortOrder").ascending().and(Sort.by("id").ascending()));
        return ResponseEntity.ok(productService.list(search, bornDay, type, active, pageable));
    }

    @GetMapping("/products/{id}")
    @Operation(summary = "Get one product with all of its detail")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.get(id));
    }

    @PostMapping("/products")
    @Operation(summary = "Create a product")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request,
                                                         @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.create(request, actorName(actor)));
    }

    @PutMapping("/products/{id}")
    @Operation(summary = "Update a product")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id,
                                                         @Valid @RequestBody ProductRequest request,
                                                         @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(productService.update(id, request, actorName(actor)));
    }

    @PutMapping("/products/{id}/active")
    @Operation(summary = "Show or hide a product on the website")
    public ResponseEntity<ProductResponse> setProductActive(@PathVariable Long id,
                                                            @RequestParam boolean active,
                                                            @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(productService.setActive(id, active, actorName(actor)));
    }

    @PostMapping("/products/reorder")
    @Operation(summary = "Persist a new display order — ids in the order they should appear")
    public ResponseEntity<Void> reorderProducts(@RequestBody List<Long> orderedIds,
                                                @AuthenticationPrincipal UserDetails actor) {
        productService.reorder(orderedIds, actorName(actor));
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/products/{id}")
    @Operation(summary = "Delete a product")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ── Bundles ─────────────────────────────────────────────────────────────

    @GetMapping("/bundles")
    @Operation(summary = "List bundles")
    public ResponseEntity<List<BundleResponse>> listBundles() {
        return ResponseEntity.ok(bundleService.list());
    }

    @GetMapping("/bundles/{id}")
    @Operation(summary = "Get one bundle")
    public ResponseEntity<BundleResponse> getBundle(@PathVariable Long id) {
        return ResponseEntity.ok(bundleService.get(id));
    }

    @PostMapping("/bundles")
    @Operation(summary = "Create a bundle")
    public ResponseEntity<BundleResponse> createBundle(@Valid @RequestBody BundleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bundleService.create(request));
    }

    @PutMapping("/bundles/{id}")
    @Operation(summary = "Update a bundle")
    public ResponseEntity<BundleResponse> updateBundle(@PathVariable Long id,
                                                       @Valid @RequestBody BundleRequest request) {
        return ResponseEntity.ok(bundleService.update(id, request));
    }

    @DeleteMapping("/bundles/{id}")
    @Operation(summary = "Delete a bundle")
    public ResponseEntity<Void> deleteBundle(@PathVariable Long id) {
        bundleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ── Promotions ──────────────────────────────────────────────────────────

    @GetMapping("/promotions")
    @Operation(summary = "List promotions, live or not")
    public ResponseEntity<List<PromotionResponse>> listPromotions() {
        return ResponseEntity.ok(promotionService.list());
    }

    @GetMapping("/promotions/{id}")
    @Operation(summary = "Get one promotion")
    public ResponseEntity<PromotionResponse> getPromotion(@PathVariable Long id) {
        return ResponseEntity.ok(promotionService.get(id));
    }

    @PostMapping("/promotions")
    @Operation(summary = "Create a promotion")
    public ResponseEntity<PromotionResponse> createPromotion(@Valid @RequestBody PromotionRequest request,
                                                             @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(promotionService.create(request, actorName(actor)));
    }

    @PutMapping("/promotions/{id}")
    @Operation(summary = "Update a promotion")
    public ResponseEntity<PromotionResponse> updatePromotion(@PathVariable Long id,
                                                             @Valid @RequestBody PromotionRequest request,
                                                             @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(promotionService.update(id, request, actorName(actor)));
    }

    @PutMapping("/promotions/{id}/active")
    @Operation(summary = "Switch a promotion on or off without editing it")
    public ResponseEntity<PromotionResponse> setPromotionActive(@PathVariable Long id,
                                                                @RequestParam boolean active,
                                                                @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(promotionService.setActive(id, active, actorName(actor)));
    }

    @DeleteMapping("/promotions/{id}")
    @Operation(summary = "Delete a promotion")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ── Image picker ────────────────────────────────────────────────────────

    @GetMapping("/images")
    @Operation(summary = "List image paths available to the website, for the product editor's picker")
    public ResponseEntity<Map<String, Object>> listImages(@RequestParam(required = false) String search) {
        return ResponseEntity.ok(Map.of(
                "available", imageLibrary.available(),
                "images", imageLibrary.list(search)));
    }

    private static String actorName(UserDetails actor) {
        return actor == null ? null : actor.getUsername();
    }
}
