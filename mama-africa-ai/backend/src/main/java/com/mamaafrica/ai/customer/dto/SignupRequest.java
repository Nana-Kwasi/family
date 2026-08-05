package com.mamaafrica.ai.customer.dto;

import com.mamaafrica.ai.policy.PolicyKind;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank @Size(max = 255) String fullName,
        @NotBlank @Email @Size(max = 255) String email,
        // Eight characters, not six. The old Firebase minimum was six; this is a real
        // account now and the floor should not be the weakest thing the library allowed.
        @NotBlank @Size(min = 8, max = 128) String password,
        @Size(max = 120) String akanName,
        @Size(max = 16) String dayBorn,
        @Size(max = 32) String dob,

        /**
         * Which policies the visitor ticked. Verified server-side against the ones actually
         * marked required — a tick box in a browser is a courtesy, not evidence.
         */
        java.util.Set<PolicyKind> acceptedPolicies
) {
}
