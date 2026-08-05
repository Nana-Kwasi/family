package com.mamaafrica.ai.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "rag")
public record RagProperties(

        /** When false the chat pipeline skips retrieval entirely and the model answers from general knowledge. */
        boolean enabled,

        /** Characters per chunk, and how much neighbouring chunks overlap. */
        int chunkSize,
        int chunkOverlap,

        /** How many chunks are injected into the prompt. */
        int maxResults,

        /** Chunks scoring below this are treated as irrelevant and dropped. */
        double minScore
) {
}
