package com.mamaafrica.ai.auth.dto;

public record LoginResponse(
        String token,
        String tokenType,
        long expiresInSeconds,
        UserResponse user
) {
}
