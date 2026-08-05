package com.mamaafrica.ai.culture.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SubscriberRequest(
        @NotBlank @Email @Size(max = 255) String email,
        @Size(max = 120) String akanName,
        @Size(max = 16) String dayBorn,
        @Size(max = 32) String dob,
        @Size(max = 120) String source
) {
}
