package com.mamaafrica.ai.config;

import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "qdrant")
public record QdrantProperties(

        @NotBlank String host,

        /** gRPC port — 6334, not the 6333 REST port. */
        int port,

        @NotBlank String collection,

        String apiKey,

        boolean useTls
) {
}
