package com.mamaafrica.ai.customer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
        @NotBlank @Size(max = 255) String fullName,
        @Size(max = 120) String akanName,
        @Size(max = 16) String dayBorn,
        @Size(max = 32) String dob
) {
}
