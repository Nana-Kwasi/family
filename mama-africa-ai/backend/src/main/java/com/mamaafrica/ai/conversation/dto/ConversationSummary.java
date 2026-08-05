package com.mamaafrica.ai.conversation.dto;

import com.mamaafrica.ai.conversation.Conversation;
import com.mamaafrica.ai.language.Language;

import java.time.Instant;
import java.util.UUID;

public record ConversationSummary(
        UUID id,
        String title,
        Language language,
        String model,
        String provider,
        Instant createdAt,
        Instant updatedAt
) {

    public static ConversationSummary from(Conversation conversation) {
        return new ConversationSummary(conversation.getId(), conversation.getTitle(), conversation.getLanguage(),
                conversation.getModel(), conversation.getProvider(),
                conversation.getCreatedAt(), conversation.getUpdatedAt());
    }
}
