package com.mamaafrica.ai.settings;

import com.mamaafrica.ai.config.AiProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/** The one editable settings row. Its id is always {@link #SINGLETON_ID}. */
@Entity
@Table(name = "ai_settings")
public class AiSettings {

    public static final long SINGLETON_ID = 1L;

    @Id
    private Long id = SINGLETON_ID;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private AiProperties.Provider provider;

    @Column(name = "base_url", nullable = false, length = 500)
    private String baseUrl;

    @Column(nullable = false, length = 200)
    private String model;

    @Column(nullable = false)
    private double temperature;

    @Column(name = "max_tokens", nullable = false)
    private int maxTokens;

    @Column(name = "system_prompt", nullable = false, columnDefinition = "text")
    private String systemPrompt;

    @Column(name = "rag_enabled", nullable = false)
    private boolean ragEnabled;

    @Column(name = "chunk_size", nullable = false)
    private int chunkSize;

    @Column(name = "chunk_overlap", nullable = false)
    private int chunkOverlap;

    @Column(name = "max_results", nullable = false)
    private int maxResults;

    @Column(name = "min_score", nullable = false)
    private double minScore;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    @Column(name = "updated_by")
    private String updatedBy;

    protected AiSettings() {
    }

    public static AiSettings from(EffectiveSettings values, String updatedBy) {
        var settings = new AiSettings();
        settings.apply(values, updatedBy);
        return settings;
    }

    public void apply(EffectiveSettings values, String updatedBy) {
        this.provider = values.provider();
        this.baseUrl = values.baseUrl();
        this.model = values.model();
        this.temperature = values.temperature();
        this.maxTokens = values.maxTokens();
        this.systemPrompt = values.systemPrompt();
        this.ragEnabled = values.ragEnabled();
        this.chunkSize = values.chunkSize();
        this.chunkOverlap = values.chunkOverlap();
        this.maxResults = values.maxResults();
        this.minScore = values.minScore();
        this.updatedAt = Instant.now();
        this.updatedBy = updatedBy;
    }

    public EffectiveSettings toEffective() {
        return new EffectiveSettings(provider, baseUrl, model, temperature, maxTokens, systemPrompt,
                ragEnabled, chunkSize, chunkOverlap, maxResults, minScore);
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }
}
