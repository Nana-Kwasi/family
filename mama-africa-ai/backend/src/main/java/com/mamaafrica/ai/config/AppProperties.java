package com.mamaafrica.ai.config;

import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.time.Duration;
import java.util.List;

@Validated
@ConfigurationProperties(prefix = "app")
public record AppProperties(Security security, Cors cors) {

    public record Security(Jwt jwt, Bootstrap bootstrap, String publicApiKey) {

        public record Jwt(@NotBlank String secret, Duration expiration, @NotBlank String issuer) {
        }

        /** Super admin created on first start when the user table is empty. */
        public record Bootstrap(@NotBlank String email, @NotBlank String password, String fullName) {
        }

        /** When blank, {@code /api/chat} is open. When set, callers must send {@code X-Api-Key}. */
        public boolean publicApiKeyEnabled() {
            return publicApiKey != null && !publicApiKey.isBlank();
        }
    }

    public record Cors(List<String> allowedOrigins) {
    }
}
