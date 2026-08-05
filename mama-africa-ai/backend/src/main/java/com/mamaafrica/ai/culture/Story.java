package com.mamaafrica.ai.culture;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

/** A story or proverb published on the website's Stories page. Authored in the admin console. */
@Entity
@Table(name = "culture_story")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private StoryKind kind = StoryKind.STORY;

    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "content_type", nullable = false, length = 48)
    private ContentType contentType = ContentType.GENERAL;

    @Column(nullable = false)
    private boolean published = true;

    private String author;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "culture_story_chapter", joinColumns = @JoinColumn(name = "story_id"))
    @OrderColumn(name = "position")
    private List<Chapter> chapters = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "culture_story_link", joinColumns = @JoinColumn(name = "story_id"))
    @OrderColumn(name = "position")
    private List<SocialLink> socialLinks = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    @Column(name = "updated_by")
    private String updatedBy;

    protected Story() {
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

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public StoryKind getKind() {
        return kind;
    }

    public void setKind(StoryKind kind) {
        this.kind = kind;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ContentType getContentType() {
        return contentType;
    }

    public void setContentType(ContentType contentType) {
        this.contentType = contentType;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public List<SocialLink> getSocialLinks() {
        return socialLinks;
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
