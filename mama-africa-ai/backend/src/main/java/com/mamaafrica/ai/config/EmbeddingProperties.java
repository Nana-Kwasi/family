package com.mamaafrica.ai.config;

import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/**
 * Embeddings are configured separately from the chat model: a RunPod endpoint serving
 * Gemma does not serve embeddings, so the two rarely point at the same place.
 */
@Validated
@ConfigurationProperties(prefix = "ai.embedding")
public record EmbeddingProperties(

        @NotNull Provider provider,

        /** Ignored by IN_PROCESS. */
        String baseUrl,

        /** Ignored by IN_PROCESS. e.g. nomic-embed-text (Ollama). */
        String model,

        String apiKey
) {

    public enum Provider {
        /** all-MiniLM-L6-v2 bundled as ONNX and run inside the JVM. No server, 384 dimensions. */
        IN_PROCESS,
        /** An Ollama embedding model, e.g. nomic-embed-text. */
        OLLAMA,
        /** Any OpenAI-compatible embeddings endpoint. */
        OPENAI
    }
}
