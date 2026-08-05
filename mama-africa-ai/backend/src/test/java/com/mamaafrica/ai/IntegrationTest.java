package com.mamaafrica.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mamaafrica.ai.settings.ChatModelProvider;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.StreamingChatModel;
import dev.langchain4j.store.embedding.EmbeddingSearchResult;
import dev.langchain4j.store.embedding.EmbeddingStore;
import io.qdrant.client.QdrantClient;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

/**
 * Shared setup for API tests. The model provider and Qdrant are mocked so the suite runs
 * offline; the embedding model is the real in-process one, so chunking and embedding are
 * genuinely exercised.
 */
@SpringBootTest
@ActiveProfiles("test")
public abstract class IntegrationTest {

    protected static final String ADMIN_LOGIN = """
            {"email":"admin@test.local","password":"TestPassword123!"}""";

    /** Mocking the provider rather than the models keeps settings-driven rebuilds out of the tests. */
    @MockitoBean
    protected ChatModelProvider chatModelProvider;

    @MockitoBean
    protected EmbeddingStore<TextSegment> embeddingStore;

    @MockitoBean
    protected QdrantClient qdrantClient;

    @Autowired
    protected ObjectMapper objectMapper;

    protected ChatModel chatModel;
    protected StreamingChatModel streamingChatModel;
    protected MockMvc mockMvc;

    @Autowired
    void initMockMvc(WebApplicationContext context) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    }

    @BeforeEach
    void wireModelsAndEmptyKnowledgeBase() {
        chatModel = Mockito.mock(ChatModel.class);
        streamingChatModel = Mockito.mock(StreamingChatModel.class);
        when(chatModelProvider.chatModel()).thenReturn(chatModel);
        when(chatModelProvider.streamingChatModel()).thenReturn(streamingChatModel);
        when(embeddingStore.search(any())).thenReturn(new EmbeddingSearchResult<>(List.of()));
    }

    protected String adminToken() throws Exception {
        var response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON).content(ADMIN_LOGIN))
                .andReturn().getResponse().getContentAsString();
        return "Bearer " + objectMapper.readTree(response).get("token").asText();
    }
}
