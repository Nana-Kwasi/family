package com.mamaafrica.ai.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Refuses to run in production with development placeholders still in place.
 *
 * <p>Every value here is one that silently works in development and quietly compromises a live
 * deployment, so failing loudly at startup beats discovering it later.
 */
@Component
@Profile("prod")
public class ProductionSafetyCheck {

    private static final Logger log = LoggerFactory.getLogger(ProductionSafetyCheck.class);

    private static final String DEFAULT_JWT_SECRET =
            "change-me-in-production-this-must-be-at-least-32-characters-long";
    private static final String DEFAULT_ADMIN_PASSWORD = "ChangeMe123!";
    private static final int MIN_SECRET_LENGTH = 32;

    private final AppProperties app;

    public ProductionSafetyCheck(AppProperties app) {
        this.app = app;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void verify() {
        var problems = new ArrayList<String>();
        var security = app.security();

        if (DEFAULT_JWT_SECRET.equals(security.jwt().secret())) {
            problems.add("JWT_SECRET is still the development default");
        }
        if (security.jwt().secret().length() < MIN_SECRET_LENGTH) {
            problems.add("JWT_SECRET must be at least " + MIN_SECRET_LENGTH + " characters");
        }
        if (DEFAULT_ADMIN_PASSWORD.equals(security.bootstrap().password())) {
            problems.add("ADMIN_PASSWORD is still the development default");
        }
        if (!security.publicApiKeyEnabled()) {
            problems.add("PUBLIC_API_KEY is not set, leaving /api/chat open to anyone");
        }
        if (containsLocalhost(app.cors().allowedOrigins())) {
            problems.add("CORS_ALLOWED_ORIGINS still contains localhost");
        }

        if (!problems.isEmpty()) {
            throw new IllegalStateException(
                    "Refusing to start in the prod profile:\n  - " + String.join("\n  - ", problems));
        }
        log.info("Production safety checks passed");
    }

    private static boolean containsLocalhost(List<String> origins) {
        return origins != null && origins.stream().anyMatch(origin -> origin.contains("localhost"));
    }
}
