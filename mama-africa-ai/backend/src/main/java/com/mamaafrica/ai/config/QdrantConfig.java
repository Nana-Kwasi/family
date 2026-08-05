package com.mamaafrica.ai.config;

import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.store.embedding.qdrant.QdrantEmbeddingStore;
import io.qdrant.client.QdrantClient;
import io.qdrant.client.QdrantGrpcClient;
import io.qdrant.client.grpc.Collections.Distance;
import io.qdrant.client.grpc.Collections.VectorParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QdrantConfig {

    private static final Logger log = LoggerFactory.getLogger(QdrantConfig.class);

    @Bean(destroyMethod = "close")
    public QdrantClient qdrantClient(QdrantProperties props) {
        var grpc = QdrantGrpcClient.newBuilder(props.host(), props.port(), props.useTls());
        if (props.apiKey() != null && !props.apiKey().isBlank()) {
            grpc.withApiKey(props.apiKey());
        }
        return new QdrantClient(grpc.build());
    }

    /**
     * Creates the collection on first start, sized to the active embedding model.
     *
     * <p>A collection's vector size is fixed at creation, so switching embedding model without
     * re-creating the collection would silently corrupt search. We fail fast instead.
     */
    @Bean
    public EmbeddingStore<TextSegment> embeddingStore(QdrantClient client,
                                                      QdrantProperties props,
                                                      EmbeddingModel embeddingModel) throws Exception {
        var collection = props.collection();
        var dimension = embeddingModel.dimension();

        if (Boolean.TRUE.equals(client.collectionExistsAsync(collection).get())) {
            var existing = client.getCollectionInfoAsync(collection).get()
                    .getConfig().getParams().getVectorsConfig().getParams().getSize();
            if (existing != dimension) {
                throw new IllegalStateException(
                        ("Qdrant collection '%s' stores %d-dimension vectors but the configured embedding model "
                                + "produces %d. Delete the collection and re-index, or switch the model back.")
                                .formatted(collection, existing, dimension));
            }
            log.info("Using existing Qdrant collection '{}' ({} dimensions)", collection, dimension);
        } else {
            client.createCollectionAsync(collection, VectorParams.newBuilder()
                    .setSize(dimension)
                    .setDistance(Distance.Cosine)
                    .build()).get();
            log.info("Created Qdrant collection '{}' ({} dimensions)", collection, dimension);
        }

        return QdrantEmbeddingStore.builder()
                .client(client)
                .collectionName(collection)
                .build();
    }
}
