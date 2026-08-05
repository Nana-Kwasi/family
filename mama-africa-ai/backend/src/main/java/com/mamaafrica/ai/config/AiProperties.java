package com.mamaafrica.ai.config;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.time.Duration;

/**
 * Everything the AI layer needs, driven purely by configuration.
 * Switching between local Ollama and remote RunPod is a matter of changing
 * {@code AI_PROVIDER}, {@code AI_BASE_URL} and {@code AI_MODEL} — never code.
 */
@Validated
@ConfigurationProperties(prefix = "ai")
public record AiProperties(

        @NotNull Provider provider,

        /** e.g. http://localhost:11434 (Ollama) or https://xxx.runpod.net/v1 (OpenAI-compatible). */
        @NotBlank String baseUrl,

        /** e.g. gemma3:1b (Ollama) or google/gemma-3-12b-it (RunPod / vLLM). */
        @NotBlank String model,

        /** Only needed by OpenAI-compatible endpoints. Ignored by Ollama. */
        String apiKey,

        @NotNull Double temperature,

        @NotNull Integer maxTokens,

        @NotNull Duration timeout,

        @NotBlank String systemPrompt,

        boolean logRequests
) {

    public enum Provider {
        /** Native Ollama API — used for local development (Gemma 3 1B). */
        OLLAMA,
        /** Any OpenAI-compatible server (vLLM / TGI on RunPod) — used in production. */
        OPENAI
    }
}
