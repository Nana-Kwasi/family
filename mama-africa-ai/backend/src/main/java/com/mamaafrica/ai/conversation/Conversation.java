package com.mamaafrica.ai.conversation;

import com.mamaafrica.ai.language.Language;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "conversations")
public class Conversation {

    private static final int TITLE_MAX_LENGTH = 120;

    @Id
    private UUID id = UUID.randomUUID();

    /** First words of the opening question — enough for the admin console list. */
    @Column(length = 255)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Language language;

    @Column(length = 128)
    private String model;

    @Column(length = 32)
    private String provider;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    protected Conversation() {
    }

    public Conversation(Language language, String firstMessage) {
        this.language = language;
        this.title = toTitle(firstMessage);
    }

    private static String toTitle(String firstMessage) {
        var single = firstMessage.strip().replaceAll("\\s+", " ");
        return single.length() <= TITLE_MAX_LENGTH ? single : single.substring(0, TITLE_MAX_LENGTH) + "…";
    }

    public void touch(String model, String provider) {
        this.model = model;
        this.provider = provider;
        this.updatedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getModel() {
        return model;
    }

    public String getProvider() {
        return provider;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
