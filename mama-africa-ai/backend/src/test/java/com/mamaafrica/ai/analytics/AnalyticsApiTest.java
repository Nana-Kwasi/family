package com.mamaafrica.ai.analytics;

import com.mamaafrica.ai.IntegrationTest;
import dev.langchain4j.data.message.AiMessage;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class AnalyticsApiTest extends IntegrationTest {

    @Test
    void reportsAnEmptyWindowWithoutFailing() throws Exception {
        mockMvc.perform(get("/api/analytics").param("days", "7").header("Authorization", adminToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.days").value(7))
                .andExpect(jsonPath("$.totals.conversations").value(0))
                .andExpect(jsonPath("$.totals.messagesPerConversation").value(0.0))
                .andExpect(jsonPath("$.latency.sampleCount").value(0))
                .andExpect(jsonPath("$.latency.p95Ms").value(0))
                // Every day in the window is present, even the quiet ones.
                .andExpect(jsonPath("$.activity.length()").value(7));
    }

    @Test
    void countsConversationsMessagesAndLanguages() throws Exception {
        stubReply("Ghana is in West Africa.");
        chat("""
                {"message":"Tell me about Ghana"}""");
        chat("""
                {"message":"Bonjour, parlez-moi du Ghana s'il vous plaît"}""");

        mockMvc.perform(get("/api/analytics").header("Authorization", adminToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.days").value(30))
                .andExpect(jsonPath("$.totals.conversations").value(2))
                .andExpect(jsonPath("$.totals.messages").value(4))
                .andExpect(jsonPath("$.totals.messagesPerConversation").value(2.0))
                .andExpect(jsonPath("$.activity.length()").value(30))
                .andExpect(jsonPath("$.languages.length()").value(2))
                .andExpect(jsonPath("$.latency.sampleCount").value(2))
                .andExpect(jsonPath("$.models[0].label").value("gemma3:1b"));
    }

    @Test
    void rejectsAnOutOfRangeWindow() throws Exception {
        mockMvc.perform(get("/api/analytics").param("days", "0").header("Authorization", adminToken()))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/analytics").param("days", "999").header("Authorization", adminToken()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void requiresAuthentication() throws Exception {
        mockMvc.perform(get("/api/analytics")).andExpect(status().isUnauthorized());
    }

    private void stubReply(String text) {
        when(chatModel.chat(anyList())).thenReturn(
                dev.langchain4j.model.chat.response.ChatResponse.builder()
                        .aiMessage(AiMessage.from(text))
                        .build());
    }

    private void chat(String body) throws Exception {
        mockMvc.perform(post("/api/chat").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk());
    }
}
