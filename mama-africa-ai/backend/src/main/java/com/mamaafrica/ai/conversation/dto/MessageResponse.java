package com.mamaafrica.ai.conversation.dto;

import com.mamaafrica.ai.conversation.Message;
import com.mamaafrica.ai.conversation.MessageRole;
import com.mamaafrica.ai.language.Language;

import java.time.Instant;

public record MessageResponse(
        Long id,
        MessageRole role,
        String content,
        Language language,
        String model,
        Long latencyMs,
        Instant createdAt
) {

    public static MessageResponse from(Message message) {
        return new MessageResponse(message.getId(), message.getRole(), message.getContent(),
                message.getLanguage(), message.getModel(), message.getLatencyMs(), message.getCreatedAt());
    }
}
