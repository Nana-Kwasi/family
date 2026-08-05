package com.mamaafrica.ai.customer.dto;

import com.mamaafrica.ai.customer.Customer;

import java.time.Instant;

/** A customer's own profile. Never carries the password hash. */
public record CustomerResponse(
        Long id,
        String email,
        String fullName,
        String preferredName,
        String akanName,
        String dayBorn,
        String dob,
        Instant createdAt
) {

    public static CustomerResponse from(Customer c) {
        return new CustomerResponse(c.getId(), c.getEmail(), c.getFullName(), c.preferredName(),
                c.getAkanName(), c.getDayBorn(), c.getDob(), c.getCreatedAt());
    }
}
