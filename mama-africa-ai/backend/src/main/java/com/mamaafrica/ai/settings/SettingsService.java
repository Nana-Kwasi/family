package com.mamaafrica.ai.settings;

import com.mamaafrica.ai.config.AiProperties;
import com.mamaafrica.ai.config.RagProperties;
import com.mamaafrica.ai.settings.dto.UpdateSettingsRequest;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Effective AI settings, read from the database and cached in memory.
 *
 * <p>On first start the row is seeded from the {@code AI_*} and {@code RAG_*} environment
 * variables, so a fresh deployment behaves exactly as configured. After that the database wins,
 * which is what lets the admin console retune the AI without a restart. {@link #resetToEnvironment}
 * puts the environment values back.
 */
@Service
public class SettingsService {

    private static final Logger log = LoggerFactory.getLogger(SettingsService.class);

    private final AiSettingsRepository repository;
    private final AiProperties aiProperties;
    private final RagProperties ragProperties;

    private volatile EffectiveSettings cached;

    public SettingsService(AiSettingsRepository repository, AiProperties aiProperties,
                           RagProperties ragProperties) {
        this.repository = repository;
        this.aiProperties = aiProperties;
        this.ragProperties = ragProperties;
    }

    @PostConstruct
    @Transactional
    public void seedAndLoad() {
        var settings = repository.findById(AiSettings.SINGLETON_ID).orElseGet(() -> {
            log.info("No stored AI settings — seeding from environment configuration");
            return repository.save(AiSettings.from(environmentDefaults(), "system"));
        });
        cached = settings.toEffective();
        log.info("AI settings loaded: provider={} model={} ragEnabled={}",
                cached.provider(), cached.model(), cached.ragEnabled());
    }

    public EffectiveSettings effective() {
        return cached;
    }

    @Transactional(readOnly = true)
    public AiSettings stored() {
        return repository.findById(AiSettings.SINGLETON_ID).orElseThrow();
    }

    @Transactional
    public EffectiveSettings update(UpdateSettingsRequest request, String updatedBy) {
        var settings = repository.findById(AiSettings.SINGLETON_ID).orElseThrow();
        settings.apply(request.toEffective(), updatedBy);
        repository.save(settings);

        var previous = cached;
        cached = settings.toEffective();
        log.info("AI settings updated by {} — model {} -> {}, ragEnabled {} -> {}",
                updatedBy, previous.model(), cached.model(), previous.ragEnabled(), cached.ragEnabled());
        return cached;
    }

    @Transactional
    public EffectiveSettings resetToEnvironment(String updatedBy) {
        var settings = repository.findById(AiSettings.SINGLETON_ID).orElseThrow();
        settings.apply(environmentDefaults(), updatedBy);
        repository.save(settings);
        cached = settings.toEffective();
        log.info("AI settings reset to environment defaults by {}", updatedBy);
        return cached;
    }

    /** What the {@code AI_*} / {@code RAG_*} environment variables say. */
    public EffectiveSettings environmentDefaults() {
        return new EffectiveSettings(
                aiProperties.provider(),
                aiProperties.baseUrl(),
                aiProperties.model(),
                aiProperties.temperature(),
                aiProperties.maxTokens(),
                aiProperties.systemPrompt(),
                ragProperties.enabled(),
                ragProperties.chunkSize(),
                ragProperties.chunkOverlap(),
                ragProperties.maxResults(),
                ragProperties.minScore());
    }
}
