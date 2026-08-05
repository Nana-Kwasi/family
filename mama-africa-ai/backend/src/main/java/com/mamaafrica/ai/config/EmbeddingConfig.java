package com.mamaafrica.ai.config;

import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.embedding.onnx.allminilml6v2.AllMiniLmL6V2EmbeddingModel;
import dev.langchain4j.model.ollama.OllamaEmbeddingModel;
import dev.langchain4j.model.openai.OpenAiEmbeddingModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmbeddingConfig {

    private static final Logger log = LoggerFactory.getLogger(EmbeddingConfig.class);

    @Bean
    public EmbeddingModel embeddingModel(EmbeddingProperties props) {
        var model = switch (props.provider()) {
            case IN_PROCESS -> new AllMiniLmL6V2EmbeddingModel();
            case OLLAMA -> OllamaEmbeddingModel.builder()
                    .baseUrl(props.baseUrl())
                    .modelName(props.model())
                    .build();
            case OPENAI -> OpenAiEmbeddingModel.builder()
                    .baseUrl(props.baseUrl())
                    .apiKey(props.apiKey() == null || props.apiKey().isBlank() ? "not-required" : props.apiKey())
                    .modelName(props.model())
                    .build();
        };

        log.info("Embedding provider={} dimension={}", props.provider(), model.dimension());
        return model;
    }
}
