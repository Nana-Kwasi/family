package com.mamaafrica.ai.culture.dto;

import com.mamaafrica.ai.culture.DiasporaStory;
import com.mamaafrica.ai.culture.ModerationStatus;

import java.time.Instant;

public record DiasporaStoryResponse(
        Long id,
        String name,
        String country,
        String akanName,
        String story,
        ModerationStatus status,
        Instant createdAt
) {

    public static DiasporaStoryResponse from(DiasporaStory d) {
        return new DiasporaStoryResponse(d.getId(), d.getName(), d.getCountry(), d.getAkanName(),
                d.getStory(), d.getStatus(), d.getCreatedAt());
    }
}
