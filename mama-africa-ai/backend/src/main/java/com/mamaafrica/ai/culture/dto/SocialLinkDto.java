package com.mamaafrica.ai.culture.dto;

import com.mamaafrica.ai.culture.SocialLink;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SocialLinkDto(@NotBlank @Size(max = 120) String label,
                            @NotBlank @Size(max = 1000) String url) {

    public static SocialLinkDto from(SocialLink link) {
        return new SocialLinkDto(link.getLabel(), link.getUrl());
    }

    public SocialLink toEntity() {
        return new SocialLink(label, url);
    }
}
