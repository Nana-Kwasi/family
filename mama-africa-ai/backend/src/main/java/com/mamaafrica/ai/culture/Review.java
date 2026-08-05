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
 * A star rating left by a visitor — on a story, the e-book, or a diaspora story. One table for
 * all three so the console moderates them in a single screen.
 */
@Entity
@Table(name = "culture_review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private ReviewSubject subject;

    /** Null for {@link ReviewSubject#BOOK} — the e-book is a single thing, not one of many. */
    @Column(name = "subject_id")
    private Long subjectId;

    @Column(name = "subject_title")
    private String subjectTitle;

    @Column(name = "author_name", nullable = false, length = 120)
    private String authorName;

    @Column(nullable = false)
    private short rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private ModerationStatus status = ModerationStatus.APPROVED;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "reviewed_at")
    private Instant reviewedAt;

    @Column(name = "reviewed_by")
    private String reviewedBy;

    protected Review() {
    }

    public Review(ReviewSubject subject, Long subjectId, String subjectTitle,
                  String authorName, short rating, String comment) {
        this.subject = subject;
        this.subjectId = subjectId;
        this.subjectTitle = subjectTitle;
        this.authorName = authorName;
        this.rating = rating;
        this.comment = comment;
    }

    public void moderate(ModerationStatus status, String actor) {
        this.status = status;
        this.reviewedAt = Instant.now();
        this.reviewedBy = actor;
    }

    public Long getId() {
        return id;
    }

    public ReviewSubject getSubject() {
        return subject;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectTitle() {
        return subjectTitle;
    }

    public String getAuthorName() {
        return authorName;
    }

    public short getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public ModerationStatus getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
