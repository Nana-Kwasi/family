package com.mamaafrica.ai.culture.dto;

import com.mamaafrica.ai.culture.ContentType;
import com.mamaafrica.ai.culture.Story;
import com.mamaafrica.ai.culture.StoryKind;

import java.time.Instant;
import java.util.List;

public record StoryResponse(
        Long id,
        String slug,
        StoryKind kind,
        String title,
        String content,
        ContentType contentType,
        boolean published,
        String author,
        int sortOrder,
        List<ChapterDto> chapters,
        List<SocialLinkDto> socialLinks,
        Instant createdAt,
        Instant updatedAt,
        String updatedBy
) {

    public static StoryResponse from(Story s) {
        return new StoryResponse(
                s.getId(), s.getSlug(), s.getKind(), s.getTitle(), s.getContent(), s.getContentType(),
                s.isPublished(), s.getAuthor(), s.getSortOrder(),
                s.getChapters().stream().map(ChapterDto::from).toList(),
                s.getSocialLinks().stream().map(SocialLinkDto::from).toList(),
                s.getCreatedAt(), s.getUpdatedAt(), s.getUpdatedBy());
    }
}
