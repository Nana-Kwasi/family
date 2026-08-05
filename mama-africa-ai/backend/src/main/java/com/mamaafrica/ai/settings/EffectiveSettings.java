package com.mamaafrica.ai.settings;

import com.mamaafrica.ai.config.AiProperties;

/**
 * The settings actually in force. Secrets (API keys) and low-level transport options stay in the
 * environment — they are never written to the database or exposed through the API.
 */
public record EffectiveSettings(
        AiProperties.Provider provider,
        String baseUrl,
        String model,
        double temperature,
        int maxTokens,
        String systemPrompt,
        boolean ragEnabled,
        int chunkSize,
        int chunkOverlap,
        int maxResults,
        double minScore
) {

    /** The subset that requires rebuilding the model client when it changes. */
    public ModelKey modelKey() {
        return new ModelKey(provider, baseUrl, model, temperature, maxTokens);
    }

    public record ModelKey(AiProperties.Provider provider, String baseUrl, String model,
                           double temperature, int maxTokens) {
    }
}
