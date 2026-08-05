package com.mamaafrica.ai.culture;

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
 * A story sent in by a visitor on the diaspora page. Published on arrival, exactly as the old
 * Firestore flow behaved; {@link ModerationStatus} exists so an admin can take one down later.
 */
@Entity
@Table(name = "culture_diaspora_story")
public class DiasporaStory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(length = 120)
    private String country;

    @Column(name = "akan_name", length = 120)
    private String akanName;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String story;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private ModerationStatus status = ModerationStatus.APPROVED;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "reviewed_at")
    private Instant reviewedAt;

    @Column(name = "reviewed_by")
    private String reviewedBy;

    protected DiasporaStory() {
    }

    public DiasporaStory(String name, String country, String akanName, String story) {
        this.name = name;
        this.country = country;
        this.akanName = akanName;
        this.story = story;
    }

    public void moderate(ModerationStatus status, String actor) {
        this.status = status;
        this.reviewedAt = Instant.now();
        this.reviewedBy = actor;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public String getAkanName() {
        return akanName;
    }

    public String getStory() {
        return story;
    }

    public ModerationStatus getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getReviewedAt() {
        return reviewedAt;
    }

    public String getReviewedBy() {
        return reviewedBy;
    }
}
