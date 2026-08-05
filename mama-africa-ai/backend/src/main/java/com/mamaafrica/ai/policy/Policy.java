package com.mamaafrica.ai.policy;

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
 * A site policy. Editing the text does not change the version; publishing does — see V10 for
 * why consent has to point at a specific version rather than at a row that can be rewritten.
 */
@Entity
@Table(name = "policy")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true, length = 32)
    private PolicyKind kind;

    @Column(nullable = false)
    private String title;

    @Column(length = 500)
    private String summary;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    @Column(nullable = false)
    private int version = 1;

    @Column(name = "required_at_signup", nullable = false)
    private boolean requiredAtSignup = true;

    @Column(nullable = false)
    private boolean published;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "published_at")
    private Instant publishedAt;

    protected Policy() {
    }

    public void edit(String title, String summary, String body, boolean requiredAtSignup, String actor) {
        this.title = title;
        this.summary = summary;
        this.body = body;
        this.requiredAtSignup = requiredAtSignup;
        this.updatedAt = Instant.now();
        this.updatedBy = actor;
    }

    /**
     * Makes the current text live and mints a new version. Called on every publish, including
     * a re-publish after an edit — that is the point: new words, new version, fresh consent.
     */
    public void publish(String actor) {
        if (this.published) {
            this.version += 1;
        }
        this.published = true;
        this.publishedAt = Instant.now();
        this.updatedAt = Instant.now();
        this.updatedBy = actor;
    }

    public void unpublish(String actor) {
        this.published = false;
        this.updatedAt = Instant.now();
        this.updatedBy = actor;
    }

    public Long getId() {
        return id;
    }

    public PolicyKind getKind() {
        return kind;
    }

    public String getTitle() {
        return title;
    }

    public String getSummary() {
        return summary;
    }

    public String getBody() {
        return body;
    }

    public int getVersion() {
        return version;
    }

    public boolean isRequiredAtSignup() {
        return requiredAtSignup;
    }

    public boolean isPublished() {
        return published;
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

    public Instant getPublishedAt() {
        return publishedAt;
    }
}
