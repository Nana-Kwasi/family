package com.mamaafrica.ai.chat;

import com.mamaafrica.ai.IntegrationTest;
import com.mamaafrica.ai.chat.dto.ChatRequest;
import com.mamaafrica.ai.conversation.ConversationRepository;
import com.mamaafrica.ai.conversation.MessageRepository;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.SystemMessage;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.store.embedding.EmbeddingMatch;
import dev.langchain4j.store.embedding.EmbeddingSearchResult;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class ChatApiTest extends IntegrationTest {

    @Autowired
    private ConversationRepository conversations;

    @Autowired
    private MessageRepository messages;

    @Test
    void answersAndPersistsTheExchange() throws Exception {
        stubReply("Ghana is a West African country.");

        mockMvc.perform(chatRequest(new ChatRequest("Tell me about Ghana", null, null, null)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response").value("Ghana is a West African country."))
                .andExpect(jsonPath("$.conversationId").isNotEmpty())
                .andExpect(jsonPath("$.language").value("ENGLISH"))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());

        var saved = conversations.findAll();
        assertThat(saved).hasSize(1);
        assertThat(messages.findByConversationIdOrderByCreatedAtAsc(saved.getFirst().getId()))
                .extracting(message -> message.getRole().name())
                .containsExactly("USER", "ASSISTANT");
    }

    @Test
    void detectsTheLanguageOfTheQuestion() throws Exception {
        stubReply("Le Ghana est un pays d'Afrique de l'Ouest.");

        mockMvc.perform(chatRequest(new ChatRequest("Bonjour, parlez-moi du Ghana s'il vous plaît", null, null, null)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.language").value("FRENCH"));
    }

    @Test
    void injectsRetrievedKnowledgeIntoTheSystemPrompt() throws Exception {
        var excerpt = "Sankofa means return and fetch it — learn from the past.";
        when(embeddingStore.search(any())).thenReturn(new EmbeddingSearchResult<>(List.of(
                new EmbeddingMatch<>(0.91, "chunk-1", Embedding.from(new float[]{0.1f}),
                        TextSegment.from(excerpt)))));
        stubReply("Sankofa is an Adinkra symbol.");

        mockMvc.perform(chatRequest(new ChatRequest("What does Sankofa mean?", null, null, null)))
                .andExpect(status().isOk());

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<ChatMessage>> captor = ArgumentCaptor.forClass(List.class);
        verify(chatModel).chat(captor.capture());

        var systemPrompt = (SystemMessage) captor.getValue().getFirst();
        assertThat(systemPrompt.text()).contains(excerpt);
    }

    @Test
    void answersWithoutContextWhenNothingIsRelevant() throws Exception {
        stubReply("I can still answer from general knowledge.");

        mockMvc.perform(chatRequest(new ChatRequest("What does Sankofa mean?", null, null, null)))
                .andExpect(status().isOk());

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<ChatMessage>> captor = ArgumentCaptor.forClass(List.class);
        verify(chatModel).chat(captor.capture());

        var systemPrompt = (SystemMessage) captor.getValue().getFirst();
        assertThat(systemPrompt.text()).doesNotContain("Knowledge base excerpts");
    }

    @Test
    void rejectsAnEmptyMessage() throws Exception {
        mockMvc.perform(chatRequest(new ChatRequest("   ", null, null, null)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.details").isArray());
    }

    @Test
    void reportsProviderOutageAsServiceUnavailable() throws Exception {
        when(chatModel.chat(anyList())).thenThrow(new RuntimeException("connection refused"));

        mockMvc.perform(chatRequest(new ChatRequest("Tell me about Ghana", null, null, null)))
                .andExpect(status().isServiceUnavailable());
    }

    @Test
    void continuesAnExistingConversation() throws Exception {
        stubReply("Accra.");

        var response = mockMvc.perform(chatRequest(new ChatRequest("What is the capital?", null, null, null)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        var conversationId = objectMapper.readTree(response).get("conversationId").asText();

        mockMvc.perform(chatRequest(new ChatRequest("And the population?", null, UUID.fromString(conversationId), null)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.conversationId").value(conversationId));

        assertThat(conversations.findAll()).hasSize(1);
        assertThat(messages.findByConversationIdOrderByCreatedAtAsc(UUID.fromString(conversationId))).hasSize(4);
    }

    private void stubReply(String text) {
        when(chatModel.chat(anyList())).thenReturn(
                dev.langchain4j.model.chat.response.ChatResponse.builder()
                        .aiMessage(AiMessage.from(text))
                        .build());
    }

    private RequestBuilder chatRequest(ChatRequest request) throws Exception {
        return post("/api/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request));
    }
}
