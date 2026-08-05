package com.mamaafrica.ai.culture.dto;

import com.mamaafrica.ai.culture.ContentType;
import com.mamaafrica.ai.culture.StoryKind;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record StoryRequest(
        @NotNull StoryKind kind,
        @Size(max = 255) String title,
        @NotBlank String content,
        ContentType contentType,
        Boolean published,
        @Size(max = 255) String author,
        Integer sortOrder,
        @Valid List<ChapterDto> chapters,
        @Valid List<SocialLinkDto> socialLinks
) {
}
