package com.mamaafrica.ai.culture.dto;

import com.mamaafrica.ai.culture.Subscriber;

import java.time.Instant;

public record SubscriberResponse(
        Long id,
        String email,
        String akanName,
        String dayBorn,
        String dob,
        String source,
        Instant createdAt
) {

    public static SubscriberResponse from(Subscriber s) {
        return new SubscriberResponse(s.getId(), s.getEmail(), s.getAkanName(), s.getDayBorn(),
                s.getDob(), s.getSource(), s.getCreatedAt());
    }
}
