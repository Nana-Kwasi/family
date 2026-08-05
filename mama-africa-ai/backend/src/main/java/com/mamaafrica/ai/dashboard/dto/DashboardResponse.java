package com.mamaafrica.ai.dashboard.dto;

import com.mamaafrica.ai.conversation.dto.ConversationSummary;

import java.util.List;

public record DashboardResponse(
        Totals totals,
        ModelInfo model,
        List<ConversationSummary> recentConversations
) {

    public record Totals(
            long conversations,
            long messages,
            long knowledgeDocuments,
            long indexedDocuments,
            long failedDocuments
    ) {
    }

    public record ModelInfo(
            String provider,
            String model,
            String baseUrl,
            boolean reachable,
            boolean ragEnabled,
            String embeddingProvider
    ) {
    }
}
