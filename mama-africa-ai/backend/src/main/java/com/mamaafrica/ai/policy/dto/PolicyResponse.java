package com.mamaafrica.ai.policy.dto;

import com.mamaafrica.ai.policy.Policy;
import com.mamaafrica.ai.policy.PolicyKind;

import java.time.Instant;

public record PolicyResponse(
        Long id,
        PolicyKind kind,
        String title,
        String summary,
        String body,
        int version,
        boolean requiredAtSignup,
        boolean published,
        int sortOrder,
        Instant updatedAt,
        String updatedBy,
        Instant publishedAt
) {

    public static PolicyResponse from(Policy p) {
        return new PolicyResponse(p.getId(), p.getKind(), p.getTitle(), p.getSummary(), p.getBody(),
                p.getVersion(), p.isRequiredAtSignup(), p.isPublished(), p.getSortOrder(),
                p.getUpdatedAt(), p.getUpdatedBy(), p.getPublishedAt());
    }
}
