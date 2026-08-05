package com.mamaafrica.ai.culture.dto;

import com.mamaafrica.ai.culture.ContentType;
import com.mamaafrica.ai.culture.Story;
import com.mamaafrica.ai.culture.StoryKind;

import java.time.Instant;

/** Row shape for the console's story table — no chapters or links, so the query stays flat. */
public record StorySummary(
        Long id,
        String slug,
        StoryKind kind,
        String title,
        ContentType contentType,
        boolean published,
        String author,
        Instant createdAt,
        Instant updatedAt
) {

    public static StorySummary from(Story s) {
        return new StorySummary(s.getId(), s.getSlug(), s.getKind(), s.getTitle(), s.getContentType(),
                s.isPublished(), s.getAuthor(), s.getCreatedAt(), s.getUpdatedAt());
    }
}
