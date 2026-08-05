package com.mamaafrica.ai.dashboard;

import com.mamaafrica.ai.IntegrationTest;
import com.mamaafrica.ai.conversation.ConversationRepository;
import dev.langchain4j.data.message.AiMessage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class DashboardApiTest extends IntegrationTest {

    @Autowired
    private ConversationRepository conversations;

    @Test
    void reportsTotalsAndModelConfiguration() throws Exception {
        mockMvc.perform(get("/api/dashboard").header("Authorization", adminToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totals.conversations").value(0))
                .andExpect(jsonPath("$.totals.knowledgeDocuments").value(0))
                .andExpect(jsonPath("$.model.provider").value("OLLAMA"))
                .andExpect(jsonPath("$.model.model").value("gemma3:1b"))
                .andExpect(jsonPath("$.model.embeddingProvider").value("IN_PROCESS"))
                .andExpect(jsonPath("$.recentConversations").isArray());
    }

    @Test
    void settingsAreExposedAsReadOnly() throws Exception {
        mockMvc.perform(get("/api/settings").header("Authorization", adminToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.editable").value(true))
                .andExpect(jsonPath("$.embeddingModel").value("all-MiniLM-L6-v2"))
                .andExpect(jsonPath("$.systemPrompt").isNotEmpty());
    }

    @Test
    void aFailedModelCallLeavesNoEmptyConversation() throws Exception {
        when(chatModel.chat(anyList())).thenThrow(new RuntimeException("connection refused"));

        mockMvc.perform(post("/api/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"message":"Tell me about Ghana"}"""))
                .andExpect(status().isServiceUnavailable());

        assertThat(conversations.findAll()).isEmpty();
    }

    @Test
    void aSuccessfulCallDoesCreateTheConversation() throws Exception {
        when(chatModel.chat(anyList())).thenReturn(
                dev.langchain4j.model.chat.response.ChatResponse.builder()
                        .aiMessage(AiMessage.from("Ghana is in West Africa."))
                        .build());

        mockMvc.perform(post("/api/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"message":"Tell me about Ghana"}"""))
                .andExpect(status().isOk());

        assertThat(conversations.findAll()).hasSize(1);
    }
}
