package com.mamaafrica.ai.user.dto;

import com.mamaafrica.ai.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(max = 255) String fullName,
        @NotBlank @Size(min = 8, max = 100) String password,
        @NotNull Role role
) {
}
