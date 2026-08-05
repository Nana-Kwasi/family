package com.mamaafrica.ai.security;

/**
 * The authenticated website visitor. A plain record rather than a Spring {@code UserDetails}:
 * customers never authenticate through the {@code AuthenticationManager}, and giving them a
 * UserDetails would make it easy to hand one to a code path meant for operators.
 */
public record CustomerPrincipal(Long id, String email, String preferredName, String fullName,
                                String akanName, String dayBorn) {
}
