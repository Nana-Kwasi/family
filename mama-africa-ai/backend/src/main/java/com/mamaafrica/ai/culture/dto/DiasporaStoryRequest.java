package com.mamaafrica.ai.culture.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** What a visitor submits on the diaspora page. */
public record DiasporaStoryRequest(
        @NotBlank @Size(max = 120) String name,
        @Size(max = 120) String country,
        @Size(max = 120) String akanName,
        // The website already asks for at least 50 characters; enforced here too, because a
        // client-side minimum is a hint, not a rule.
        @NotBlank @Size(min = 50, max = 20_000) String story
) {
}
