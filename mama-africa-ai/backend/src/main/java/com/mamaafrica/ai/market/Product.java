package com.mamaafrica.ai.market;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * A storefront product. Ordered child collections are element collections rather than
 * entities: they are owned by the product, always loaded with it, and never queried alone.
 *
 * <p>Images hold web paths (/images/...), not bytes — the files stay as static assets.
 */
@Entity
@Table(name = "market_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The numeric id this product had in src/data/products.js, so old /product/:id links resolve. */
    @Column(name = "legacy_id")
    private Integer legacyId;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(nullable = false)
    private String name;

    @Column(name = "born_day", length = 16)
    private String bornDay;

    @Column(length = 120)
    private String collection;

    @Column(name = "product_type", nullable = false, length = 32)
    private String productType;

    @Column(name = "type_label", nullable = false, length = 64)
    private String typeLabel;

    private String tagline;

    @Column(name = "card_blurb")
    private String cardBlurb;

    @Column(columnDefinition = "TEXT")
    private String description;

    /** Minor units. Kept integral so prices never drift through binary floating point. */
    @Column(name = "price_cents", nullable = false)
    private int priceCents;

    @Column(nullable = false, length = 3)
    private String currency = "USD";

    @Column(name = "primary_image", length = 500)
    private String primaryImage;

    @Column(name = "amazon_url", length = 1000)
    private String amazonUrl;

    @Column(name = "etsy_url", length = 1000)
    private String etsyUrl;

    @Column(name = "printify_url", length = 1000)
    private String printifyUrl;

    @Column(name = "sold_out", nullable = false)
    private boolean soldOut;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false)
    private boolean featured;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "market_product_image", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "url", nullable = false, length = 500)
    @OrderColumn(name = "position")
    private List<String> images = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "market_product_size", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "label", nullable = false, length = 32)
    @OrderColumn(name = "position")
    private List<String> sizes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "market_product_detail", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "text", nullable = false)
    @OrderColumn(name = "position")
    private List<String> details = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "market_product_perfect_for", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "text", nullable = false)
    @OrderColumn(name = "position")
    private List<String> perfectFor = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "market_size_chart_row", joinColumns = @JoinColumn(name = "product_id"))
    @OrderColumn(name = "position")
    private List<SizeChartRow> sizeChart = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    @Column(name = "updated_by")
    private String updatedBy;

    protected Product() {
    }

    public static String toSlug(String value) {
        return value.trim().toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }

    public void touch(String actor) {
        this.updatedAt = Instant.now();
        this.updatedBy = actor;
    }

    public Long getId() {
        return id;
    }

    public Integer getLegacyId() {
        return legacyId;
    }

    public void setLegacyId(Integer legacyId) {
        this.legacyId = legacyId;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBornDay() {
        return bornDay;
    }

    public void setBornDay(String bornDay) {
        this.bornDay = bornDay;
    }

    public String getCollection() {
        return collection;
    }

    public void setCollection(String collection) {
        this.collection = collection;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getTypeLabel() {
        return typeLabel;
    }

    public void setTypeLabel(String typeLabel) {
        this.typeLabel = typeLabel;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getCardBlurb() {
        return cardBlurb;
    }

    public void setCardBlurb(String cardBlurb) {
        this.cardBlurb = cardBlurb;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPriceCents() {
        return priceCents;
    }

    public void setPriceCents(int priceCents) {
        this.priceCents = priceCents;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPrimaryImage() {
        return primaryImage;
    }

    public void setPrimaryImage(String primaryImage) {
        this.primaryImage = primaryImage;
    }

    public String getAmazonUrl() {
        return amazonUrl;
    }

    public void setAmazonUrl(String amazonUrl) {
        this.amazonUrl = amazonUrl;
    }

    public String getEtsyUrl() {
        return etsyUrl;
    }

    public void setEtsyUrl(String etsyUrl) {
        this.etsyUrl = etsyUrl;
    }

    public String getPrintifyUrl() {
        return printifyUrl;
    }

    public void setPrintifyUrl(String printifyUrl) {
        this.printifyUrl = printifyUrl;
    }

    public boolean isSoldOut() {
        return soldOut;
    }

    public void setSoldOut(boolean soldOut) {
        this.soldOut = soldOut;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getSizes() {
        return sizes;
    }

    public void setSizes(List<String> sizes) {
        this.sizes = sizes;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }

    public List<String> getPerfectFor() {
        return perfectFor;
    }

    public void setPerfectFor(List<String> perfectFor) {
        this.perfectFor = perfectFor;
    }

    public List<SizeChartRow> getSizeChart() {
        return sizeChart;
    }

    public void setSizeChart(List<SizeChartRow> sizeChart) {
        this.sizeChart = sizeChart;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }
}
