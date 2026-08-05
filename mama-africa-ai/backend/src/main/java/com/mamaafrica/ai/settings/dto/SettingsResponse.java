package com.mamaafrica.ai.settings.dto;

import com.mamaafrica.ai.settings.AiSettings;
import com.mamaafrica.ai.settings.EffectiveSettings;

import java.time.Instant;

public record SettingsResponse(
        String provider,
        String baseUrl,
        String model,
        double temperature,
        int maxTokens,
        String systemPrompt,
        boolean ragEnabled,
        int chunkSize,
        int chunkOverlap,
        int maxResults,
        double minScore,

        // Environment-only, shown for context but not editable.
        long timeoutSeconds,
        String embeddingProvider,
        String embeddingModel,
        String qdrantCollection,

        Instant updatedAt,
        String updatedBy,

        /** True since Phase 4 — kept so the console can render read-only fields if it is ever false. */
        boolean editable
) {

    public static SettingsResponse of(EffectiveSettings settings, AiSettings stored, ReadOnlyContext context) {
        return new SettingsResponse(
                settings.provider().name(), settings.baseUrl(), settings.model(), settings.temperature(),
                settings.maxTokens(), settings.systemPrompt(), settings.ragEnabled(), settings.chunkSize(),
                settings.chunkOverlap(), settings.maxResults(), settings.minScore(),
                context.timeoutSeconds(), context.embeddingProvider(), context.embeddingModel(),
                context.qdrantCollection(),
                stored.getUpdatedAt(), stored.getUpdatedBy(), true);
    }

    public record ReadOnlyContext(long timeoutSeconds, String embeddingProvider, String embeddingModel,
                                  String qdrantCollection) {
    }
}
