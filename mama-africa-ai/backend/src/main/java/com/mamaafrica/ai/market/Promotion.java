package com.mamaafrica.ai.market;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/**
 * A merchandising message. Live when {@link #active} and the clock falls inside
 * [startsAt, endsAt] — either bound may be null, meaning open-ended on that side.
 */
@Entity
@Table(name = "market_promotion")
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(nullable = false)
    private String headline;

    @Column(columnDefinition = "TEXT")
    private String body;

    @Column(name = "badge_label", length = 64)
    private String badgeLabel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private PromotionPlacement placement = PromotionPlacement.ANNOUNCEMENT_STRIP;

    @Column(name = "cta_label", length = 64)
    private String ctaLabel;

    @Column(name = "cta_url", length = 1000)
    private String ctaUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "target_type", length = 32)
    private PromotionTarget targetType;

    @Column(name = "target_value", length = 200)
    private String targetValue;

    @Column(name = "discount_pct")
    private Integer discountPct;

    @Column(name = "starts_at")
    private Instant startsAt;

    @Column(name = "ends_at")
    private Instant endsAt;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    @Column(name = "updated_by")
    private String updatedBy;

    protected Promotion() {
    }

    /** Whether the website should show this promotion right now. */
    public boolean isLiveAt(Instant now) {
        if (!active) {
            return false;
        }
        if (startsAt != null && now.isBefore(startsAt)) {
            return false;
        }
        return endsAt == null || !now.isAfter(endsAt);
    }

    public void touch(String actor) {
        this.updatedAt = Instant.now();
        this.updatedBy = actor;
    }

    public Long getId() {
        return id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getBadgeLabel() {
        return badgeLabel;
    }

    public void setBadgeLabel(String badgeLabel) {
        this.badgeLabel = badgeLabel;
    }

    public PromotionPlacement getPlacement() {
        return placement;
    }

    public void setPlacement(PromotionPlacement placement) {
        this.placement = placement;
    }

    public String getCtaLabel() {
        return ctaLabel;
    }

    public void setCtaLabel(String ctaLabel) {
        this.ctaLabel = ctaLabel;
    }

    public String getCtaUrl() {
        return ctaUrl;
    }

    public void setCtaUrl(String ctaUrl) {
        this.ctaUrl = ctaUrl;
    }

    public PromotionTarget getTargetType() {
        return targetType;
    }

    public void setTargetType(PromotionTarget targetType) {
        this.targetType = targetType;
    }

    public String getTargetValue() {
        return targetValue;
    }

    public void setTargetValue(String targetValue) {
        this.targetValue = targetValue;
    }

    public Integer getDiscountPct() {
        return discountPct;
    }

    public void setDiscountPct(Integer discountPct) {
        this.discountPct = discountPct;
    }

    public Instant getStartsAt() {
        return startsAt;
    }

    public void setStartsAt(Instant startsAt) {
        this.startsAt = startsAt;
    }

    public Instant getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(Instant endsAt) {
        this.endsAt = endsAt;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }
}
