package com.mamaafrica.ai.support.dto;

import com.mamaafrica.ai.support.SupportMessage;
import com.mamaafrica.ai.support.SupportStatus;

import java.time.Instant;

public record SupportMessageResponse(
        Long id,
        String name,
        String email,
        String message,
        SupportStatus status,
        boolean emailed,
        Instant createdAt,
        Instant handledAt,
        String handledBy
) {

    public static SupportMessageResponse from(SupportMessage m) {
        return new SupportMessageResponse(m.getId(), m.getName(), m.getEmail(), m.getMessage(),
                m.getStatus(), m.isEmailed(), m.getCreatedAt(), m.getHandledAt(), m.getHandledBy());
    }
}
