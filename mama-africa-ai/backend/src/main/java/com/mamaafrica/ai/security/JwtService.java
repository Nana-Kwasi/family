package com.mamaafrica.ai.security;

import com.mamaafrica.ai.config.AppProperties;
import com.mamaafrica.ai.customer.Customer;
import com.mamaafrica.ai.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
public class JwtService {

    private final SecretKey key;
    private final String issuer;
    private final Duration expiration;

    public JwtService(AppProperties props) {
        var jwt = props.security().jwt();
        this.key = Keys.hmacShaKeyFor(jwt.secret().getBytes(StandardCharsets.UTF_8));
        this.issuer = jwt.issuer();
        this.expiration = jwt.expiration();
    }

    /**
     * Distinguishes an admin token from a customer one. Both are signed with the same key, so
     * without this claim a shopper whose email happened to match an operator's would be
     * authenticated as that operator. The filter reads it to decide which store to look in.
     */
    public static final String TYPE_CLAIM = "typ";
    public static final String TYPE_ADMIN = "admin";
    public static final String TYPE_CUSTOMER = "customer";

    public String generateToken(User user) {
        var now = Instant.now();
        return Jwts.builder()
                .subject(user.getEmail())
                .issuer(issuer)
                .claim(TYPE_CLAIM, TYPE_ADMIN)
                .claim("role", user.getRole().name())
                .claim("name", user.getFullName())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(expiration)))
                .signWith(key)
                .compact();
    }

    /** A website visitor's token. Carries no role — customers have exactly one privilege level. */
    public String generateCustomerToken(Customer customer) {
        var now = Instant.now();
        return Jwts.builder()
                .subject(customer.getEmail())
                .issuer(issuer)
                .claim(TYPE_CLAIM, TYPE_CUSTOMER)
                .claim("name", customer.getFullName())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(expiration)))
                .signWith(key)
                .compact();
    }

    public Duration expiresIn() {
        return expiration;
    }

    /** Returns the claims when the token is valid, otherwise empty. Never throws. */
    public Optional<Claims> parse(String token) {
        try {
            return Optional.of(Jwts.parser()
                    .verifyWith(key)
                    .requireIssuer(issuer)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload());
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }
}
