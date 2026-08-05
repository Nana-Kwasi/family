package com.mamaafrica.ai.market;

import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.market.dto.PromotionRequest;
import com.mamaafrica.ai.market.dto.PromotionResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class PromotionService {

    private final PromotionRepository promotions;

    public PromotionService(PromotionRepository promotions) {
        this.promotions = promotions;
    }

    @Transactional(readOnly = true)
    public List<PromotionResponse> list() {
        return promotions.findAllOrdered().stream().map(PromotionResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<PromotionResponse> listLive() {
        return promotions.findLive(Instant.now()).stream().map(PromotionResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public PromotionResponse get(Long id) {
        return PromotionResponse.from(promotions.findById(id)
                .orElseThrow(() -> new NotFoundException("Promotion " + id + " not found")));
    }

    @Transactional
    public PromotionResponse create(PromotionRequest request, String actor) {
        var promotion = new Promotion();
        apply(promotion, request, actor);
        promotion.setSlug(uniqueSlug(request.slug(), request.headline(), null));
        return PromotionResponse.from(promotions.save(promotion));
    }

    @Transactional
    public PromotionResponse update(Long id, PromotionRequest request, String actor) {
        var promotion = promotions.findById(id)
                .orElseThrow(() -> new NotFoundException("Promotion " + id + " not found"));
        apply(promotion, request, actor);
        promotion.setSlug(uniqueSlug(request.slug(), request.headline(), promotion.getSlug()));
        return PromotionResponse.from(promotions.save(promotion));
    }

    @Transactional
    public void delete(Long id) {
        if (!promotions.existsById(id)) {
            throw new NotFoundException("Promotion " + id + " not found");
        }
        promotions.deleteById(id);
    }

    @Transactional
    public PromotionResponse setActive(Long id, boolean active, String actor) {
        var promotion = promotions.findById(id)
                .orElseThrow(() -> new NotFoundException("Promotion " + id + " not found"));
        promotion.setActive(active);
        promotion.touch(actor);
        return PromotionResponse.from(promotions.save(promotion));
    }

    private void apply(Promotion promotion, PromotionRequest r, String actor) {
        if (r.startsAt() != null && r.endsAt() != null && !r.endsAt().isAfter(r.startsAt())) {
            throw new BadRequestException("The end of a promotion must fall after its start");
        }
        if (r.targetType() != null && (r.targetValue() == null || r.targetValue().isBlank())) {
            throw new BadRequestException("A targeted promotion needs a target value");
        }

        promotion.setHeadline(r.headline().trim());
        promotion.setBody(blankToNull(r.body()));
        promotion.setBadgeLabel(blankToNull(r.badgeLabel()));
        promotion.setPlacement(r.placement());
        promotion.setCtaLabel(blankToNull(r.ctaLabel()));
        promotion.setCtaUrl(blankToNull(r.ctaUrl()));
        promotion.setTargetType(r.targetType());
        promotion.setTargetValue(r.targetType() == null ? null : r.targetValue().trim());
        promotion.setDiscountPct(r.discountPct());
        promotion.setStartsAt(r.startsAt());
        promotion.setEndsAt(r.endsAt());
        if (r.active() != null) {
            promotion.setActive(r.active());
        }
        if (r.sortOrder() != null) {
            promotion.setSortOrder(r.sortOrder());
        }
        promotion.touch(actor);
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }

    private String uniqueSlug(String requested, String headline, String currentSlug) {
        String base = Product.toSlug((requested == null || requested.isBlank()) ? headline : requested);
        if (base.isEmpty()) {
            throw new BadRequestException("Cannot derive a slug from '" + headline + "'");
        }
        if (base.equals(currentSlug)) {
            return base;
        }
        String candidate = base;
        int suffix = 2;
        while (promotions.existsBySlug(candidate)) {
            candidate = base + "-" + suffix++;
        }
        return candidate;
    }
}
