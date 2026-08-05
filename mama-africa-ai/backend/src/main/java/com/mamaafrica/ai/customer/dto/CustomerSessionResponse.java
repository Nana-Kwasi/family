package com.mamaafrica.ai.customer.dto;

public record CustomerSessionResponse(String token, long expiresInSeconds, CustomerResponse customer) {
}
