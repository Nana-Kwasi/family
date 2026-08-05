package com.mamaafrica.ai.settings.dto;

import com.mamaafrica.ai.config.AiProperties;
import com.mamaafrica.ai.settings.EffectiveSettings;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateSettingsRequest(

        @NotNull AiProperties.Provider provider,

        @NotBlank
        @Pattern(regexp = "^https?://.+", message = "must start with http:// or https://")
        @Size(max = 500) String baseUrl,

        @NotBlank @Size(max = 200) String model,

        @NotNull @DecimalMin("0.0") @DecimalMax("2.0") Double temperature,

        @NotNull @Min(1) @Max(32000) Integer maxTokens,

        @NotBlank @Size(max = 8000) String systemPrompt,

        boolean ragEnabled,

        @NotNull @Min(100) @Max(8000) Integer chunkSize,

        @NotNull @Min(0) @Max(2000) Integer chunkOverlap,

        @NotNull @Min(1) @Max(20) Integer maxResults,

        @NotNull @DecimalMin("0.0") @DecimalMax("1.0") Double minScore
) {

    public EffectiveSettings toEffective() {
        return new EffectiveSettings(provider, baseUrl.trim(), model.trim(), temperature, maxTokens,
                systemPrompt.trim(), ragEnabled, chunkSize, chunkOverlap, maxResults, minScore);
    }
}
