package com.mamaafrica.ai.dashboard;

import com.mamaafrica.ai.config.EmbeddingProperties;
import com.mamaafrica.ai.conversation.ConversationService;
import com.mamaafrica.ai.conversation.MessageRepository;
import com.mamaafrica.ai.dashboard.dto.DashboardResponse;
import com.mamaafrica.ai.knowledge.DocumentStatus;
import com.mamaafrica.ai.knowledge.KnowledgeService;
import com.mamaafrica.ai.settings.SettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@Tag(name = "Dashboard")
public class DashboardController {

    private final ConversationService conversations;
    private final MessageRepository messages;
    private final KnowledgeService knowledge;
    private final ModelHealthService modelHealth;
    private final SettingsService settings;
    private final EmbeddingProperties embeddingProps;

    public DashboardController(ConversationService conversations,
                               MessageRepository messages,
                               KnowledgeService knowledge,
                               ModelHealthService modelHealth,
                               SettingsService settings,
                               EmbeddingProperties embeddingProps) {
        this.conversations = conversations;
        this.messages = messages;
        this.knowledge = knowledge;
        this.modelHealth = modelHealth;
        this.settings = settings;
        this.embeddingProps = embeddingProps;
    }

    @GetMapping
    @Operation(summary = "Totals, model status and recent activity for the admin dashboard")
    public ResponseEntity<DashboardResponse> dashboard() {
        var totals = new DashboardResponse.Totals(
                conversations.count(),
                messages.count(),
                knowledge.countDocuments(),
                knowledge.countByStatus(DocumentStatus.INDEXED),
                knowledge.countByStatus(DocumentStatus.FAILED));

        var current = settings.effective();
        var model = new DashboardResponse.ModelInfo(
                current.provider().name(),
                current.model(),
                current.baseUrl(),
                modelHealth.isReachable(),
                current.ragEnabled(),
                embeddingProps.provider().name());

        return ResponseEntity.ok(new DashboardResponse(totals, model, conversations.recent()));
    }
}
