package com.mamaafrica.ai.dashboard;

import com.mamaafrica.ai.settings.SettingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/** Answers "is the model server actually reachable?" for the dashboard. */
@Service
public class ModelHealthService {

    private static final Logger log = LoggerFactory.getLogger(ModelHealthService.class);
    private static final Duration PROBE_TIMEOUT = Duration.ofSeconds(3);

    private final SettingsService settings;
    private final HttpClient http;

    public ModelHealthService(SettingsService settings) {
        this.settings = settings;
        this.http = HttpClient.newBuilder().connectTimeout(PROBE_TIMEOUT).build();
    }

    public boolean isReachable() {
        var current = settings.effective();
        var url = switch (current.provider()) {
            case OLLAMA -> trimTrailingSlash(current.baseUrl()) + "/api/tags";
            case OPENAI -> trimTrailingSlash(current.baseUrl()) + "/models";
        };

        try {
            var request = HttpRequest.newBuilder(URI.create(url))
                    .timeout(PROBE_TIMEOUT)
                    .GET()
                    .build();
            var status = http.send(request, HttpResponse.BodyHandlers.discarding()).statusCode();
            return status >= 200 && status < 400;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        } catch (Exception e) {
            log.debug("Model provider probe failed for {}: {}", url, e.getMessage());
            return false;
        }
    }

    private static String trimTrailingSlash(String url) {
        return url.endsWith("/") ? url.substring(0, url.length() - 1) : url;
    }
}
