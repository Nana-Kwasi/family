package com.mamaafrica.ai.chat.dto;

import com.mamaafrica.ai.language.Language;

import java.time.Instant;
import java.util.UUID;

public record ChatResponse(
        String response,
        UUID conversationId,
        Language language,
        String model,
        long latencyMs,
        Instant timestamp
) {
}
