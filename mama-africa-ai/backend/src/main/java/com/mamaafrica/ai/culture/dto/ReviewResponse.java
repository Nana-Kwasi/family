package com.mamaafrica.ai.culture.dto;

import com.mamaafrica.ai.culture.ModerationStatus;
import com.mamaafrica.ai.culture.Review;
import com.mamaafrica.ai.culture.ReviewSubject;

import java.time.Instant;

public record ReviewResponse(
        Long id,
        ReviewSubject subject,
        Long subjectId,
        String subjectTitle,
        String name,
        int rating,
        String comment,
        ModerationStatus status,
        Instant createdAt
) {

    public static ReviewResponse from(Review r) {
        return new ReviewResponse(r.getId(), r.getSubject(), r.getSubjectId(), r.getSubjectTitle(),
                r.getAuthorName(), r.getRating(), r.getComment(), r.getStatus(), r.getCreatedAt());
    }
}
