package com.mamaafrica.ai.common;

import jakarta.servlet.http.HttpServletRequest;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

/**
 * A stable, non-reversible handle for "the same caller", used only for rate limiting.
 *
 * <p>The raw address is never stored or logged. It is salted with the application's JWT secret
 * so the digests cannot be reversed with a rainbow table of the IPv4 space — an unsalted
 * SHA-256 of an IP address is trivially invertible, which would make this a privacy problem
 * rather than a mitigation for one.
 */
public final class ClientFingerprint {

    private ClientFingerprint() {
    }

    public static String of(HttpServletRequest request, String salt) {
        return hash(clientAddress(request), salt);
    }

    public static String hash(String value, String salt) {
        try {
            var digest = MessageDigest.getInstance("SHA-256");
            digest.update(salt.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest.digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 is required but unavailable", e);
        }
    }

    /**
     * Honours X-Forwarded-For, since in production a TLS-terminating proxy sits in front and
     * every request would otherwise appear to come from the proxy — one shared bucket for the
     * whole internet. Only the first hop is used; the rest is client-supplied and untrusted.
     */
    private static String clientAddress(HttpServletRequest request) {
        var forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr() == null ? "unknown" : request.getRemoteAddr();
    }
}
