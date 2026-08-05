package com.mamaafrica.ai.settings;

import com.mamaafrica.ai.config.AiProperties;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.StreamingChatModel;
import dev.langchain4j.model.ollama.OllamaChatModel;
import dev.langchain4j.model.ollama.OllamaStreamingChatModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.model.openai.OpenAiStreamingChatModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Supplies the chat models for the current settings, rebuilding them when the settings change.
 *
 * <p>This is the single place where the local (Ollama / Gemma 3 1B) and remote
 * (RunPod / Gemma 3 12B) providers differ. Editing the model in the admin console takes effect on
 * the next request — no restart, no code change.
 */
@Component
public class ChatModelProvider {

    private static final Logger log = LoggerFactory.getLogger(ChatModelProvider.class);

    private final AiProperties env;
    private final SettingsService settings;

    private EffectiveSettings.ModelKey builtFrom;
    private ChatModel chatModel;
    private StreamingChatModel streamingChatModel;

    public ChatModelProvider(AiProperties env, SettingsService settings) {
        this.env = env;
        this.settings = settings;
    }

    public synchronized ChatModel chatModel() {
        rebuildIfStale();
        return chatModel;
    }

    public synchronized StreamingChatModel streamingChatModel() {
        rebuildIfStale();
        return streamingChatModel;
    }

    private void rebuildIfStale() {
        var key = settings.effective().modelKey();
        if (key.equals(builtFrom)) {
            return;
        }

        log.info("Building chat model: provider={} model={} baseUrl={}",
                key.provider(), key.model(), key.baseUrl());
        chatModel = build(key);
        streamingChatModel = buildStreaming(key);
        builtFrom = key;
    }

    private ChatModel build(EffectiveSettings.ModelKey key) {
        return switch (key.provider()) {
            case OLLAMA -> OllamaChatModel.builder()
                    .baseUrl(key.baseUrl())
                    .modelName(key.model())
                    .temperature(key.temperature())
                    .numPredict(key.maxTokens())
                    .timeout(env.timeout())
                    .logRequests(env.logRequests())
                    .logResponses(env.logRequests())
                    .build();
            case OPENAI -> OpenAiChatModel.builder()
                    .baseUrl(key.baseUrl())
                    .apiKey(apiKeyOrPlaceholder())
                    .modelName(key.model())
                    .temperature(key.temperature())
                    .maxTokens(key.maxTokens())
                    .timeout(env.timeout())
                    .logRequests(env.logRequests())
                    .logResponses(env.logRequests())
                    .build();
        };
    }

    private StreamingChatModel buildStreaming(EffectiveSettings.ModelKey key) {
        return switch (key.provider()) {
            case OLLAMA -> OllamaStreamingChatModel.builder()
                    .baseUrl(key.baseUrl())
                    .modelName(key.model())
                    .temperature(key.temperature())
                    .numPredict(key.maxTokens())
                    .timeout(env.timeout())
                    .logRequests(env.logRequests())
                    .build();
            case OPENAI -> OpenAiStreamingChatModel.builder()
                    .baseUrl(key.baseUrl())
                    .apiKey(apiKeyOrPlaceholder())
                    .modelName(key.model())
                    .temperature(key.temperature())
                    .maxTokens(key.maxTokens())
                    .timeout(env.timeout())
                    .logRequests(env.logRequests())
                    .build();
        };
    }

    /** Self-hosted OpenAI-compatible servers often need no key, but the client requires a value. */
    private String apiKeyOrPlaceholder() {
        return (env.apiKey() == null || env.apiKey().isBlank()) ? "not-required" : env.apiKey();
    }
}
