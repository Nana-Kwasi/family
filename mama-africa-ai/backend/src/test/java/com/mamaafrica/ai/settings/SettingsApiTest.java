package com.mamaafrica.ai.settings;

import com.mamaafrica.ai.IntegrationTest;
import com.mamaafrica.ai.config.AiProperties;
import com.mamaafrica.ai.language.Language;
import com.mamaafrica.ai.prompt.PromptBuilder;
import com.mamaafrica.ai.settings.dto.UpdateSettingsRequest;
import dev.langchain4j.data.message.SystemMessage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.context.transaction.AfterTransaction;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class SettingsApiTest extends IntegrationTest {

    private static final String VALID_UPDATE = """
            {"provider":"OLLAMA","baseUrl":"http://localhost:11434","model":"gemma3:4b",
             "temperature":0.4,"maxTokens":2048,"systemPrompt":"You are a concise Ghana guide.",
             "ragEnabled":false,"chunkSize":600,"chunkOverlap":80,"maxResults":3,"minScore":0.75}""";

    @Autowired
    private SettingsService settingsService;

    @Autowired
    private PromptBuilder promptBuilder;

    @Autowired
    private AiProperties aiProperties;

    /**
     * The database rolls back automatically, but {@link SettingsService} caches the effective
     * settings in memory. This must run <em>after</em> the rollback — reloading inside the test
     * transaction would just re-cache the uncommitted values and leak them into other tests.
     */
    @AfterTransaction
    void restoreCachedSettings() {
        settingsService.seedAndLoad();
    }

    @Test
    void settingsAreSeededFromTheEnvironmentOnFirstStart() throws Exception {
        mockMvc.perform(get("/api/settings").header("Authorization", adminToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.provider").value("OLLAMA"))
                .andExpect(jsonPath("$.model").value("gemma3:1b"))
                .andExpect(jsonPath("$.ragEnabled").value(true))
                .andExpect(jsonPath("$.editable").value(true));
    }

    @Test
    void updatingSettingsChangesWhatTheChatPipelineUses() throws Exception {
        mockMvc.perform(update(VALID_UPDATE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.model").value("gemma3:4b"))
                .andExpect(jsonPath("$.ragEnabled").value(false))
                .andExpect(jsonPath("$.updatedBy").value("admin@test.local"));

        var effective = settingsService.effective();
        assertThat(effective.model()).isEqualTo("gemma3:4b");
        assertThat(effective.temperature()).isEqualTo(0.4);
        assertThat(effective.ragEnabled()).isFalse();

        // The new system prompt reaches the model without a restart.
        var prompt = promptBuilder.build("Hello", Language.ENGLISH, List.of(), List.of());
        assertThat(((SystemMessage) prompt.getFirst()).text()).contains("concise Ghana guide");
    }

    /** Uses a real provider rather than the mocked bean, to exercise the rebuild logic itself. */
    @Test
    void changingTheModelRebuildsTheClient() {
        var provider = new ChatModelProvider(aiProperties, settingsService);

        var before = provider.chatModel();
        assertThat(provider.chatModel()).as("unchanged settings reuse the client").isSameAs(before);

        settingsService.update(new UpdateSettingsRequest(
                AiProperties.Provider.OLLAMA, "http://localhost:11434", "gemma3:27b",
                0.7, 1024, "You are Mama Africa AI.", true, 900, 150, 5, 0.6), "test");

        assertThat(provider.chatModel()).as("a new model rebuilds the client").isNotSameAs(before);
    }

    @Test
    void switchingProviderToOpenAiWorksWithoutCodeChanges() {
        var provider = new ChatModelProvider(aiProperties, settingsService);

        settingsService.update(new UpdateSettingsRequest(
                AiProperties.Provider.OPENAI, "https://example.runpod.net/v1", "google/gemma-3-12b-it",
                0.7, 1024, "You are Mama Africa AI.", true, 900, 150, 5, 0.6), "test");

        assertThat(provider.chatModel().getClass().getSimpleName()).contains("OpenAi");
    }

    @Test
    void resetRestoresTheEnvironmentValues() throws Exception {
        mockMvc.perform(update(VALID_UPDATE)).andExpect(status().isOk());

        mockMvc.perform(post("/api/settings/reset").header("Authorization", adminToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.model").value("gemma3:1b"))
                .andExpect(jsonPath("$.ragEnabled").value(true));
    }

    @Test
    void invalidValuesAreRejectedAndNothingIsApplied() throws Exception {
        mockMvc.perform(update("""
                        {"provider":"OLLAMA","baseUrl":"not-a-url","model":"x","temperature":9.9,
                         "maxTokens":0,"systemPrompt":"","ragEnabled":true,"chunkSize":5,
                         "chunkOverlap":0,"maxResults":99,"minScore":5.0}"""))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.details").isArray());

        assertThat(settingsService.effective().model()).isEqualTo("gemma3:1b");
    }

    @Test
    void ordinaryAdminsMayReadButNotChangeSettings() throws Exception {
        mockMvc.perform(post("/api/users")
                        .header("Authorization", adminToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"plain@test.local","fullName":"Plain Admin",
                                 "password":"PlainPass1234","role":"ADMIN"}"""))
                .andExpect(status().isCreated());

        var response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"plain@test.local","password":"PlainPass1234"}"""))
                .andReturn().getResponse().getContentAsString();
        var adminOnlyToken = "Bearer " + objectMapper.readTree(response).get("token").asText();

        mockMvc.perform(get("/api/settings").header("Authorization", adminOnlyToken))
                .andExpect(status().isOk());

        mockMvc.perform(put("/api/settings")
                        .header("Authorization", adminOnlyToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_UPDATE))
                .andExpect(status().isForbidden());
    }

    private RequestBuilder update(String body) throws Exception {
        return put("/api/settings")
                .header("Authorization", adminToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(body);
    }
}
