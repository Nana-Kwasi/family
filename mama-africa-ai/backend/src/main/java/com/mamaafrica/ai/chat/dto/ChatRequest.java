package com.mamaafrica.ai.chat.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record ChatRequest(

        @NotBlank
        @Size(max = 4000)
        @Schema(example = "Tell me about Ghana")
        String message,

        @Schema(description = "English, French, Spanish or Twi. Detected automatically when omitted.",
                example = "English")
        String language,

        @Schema(description = "Omit to start a new conversation.")
        UUID conversationId,

        @Size(max = 120)
        @Schema(description = "What to call the visitor. Ignored when a signed-in customer's "
                + "token accompanies the request — that name is trusted, this one is not.")
        String visitorName
) {
}
