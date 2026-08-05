package com.mamaafrica.ai.culture.dto;

import com.mamaafrica.ai.culture.Chapter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChapterDto(@Size(max = 255) String heading, @NotBlank String content) {

    public static ChapterDto from(Chapter chapter) {
        return new ChapterDto(chapter.getHeading(), chapter.getContent());
    }

    public Chapter toEntity() {
        return new Chapter(heading, content);
    }
}
