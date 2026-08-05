package com.mamaafrica.ai.auth;

import com.mamaafrica.ai.auth.dto.LoginRequest;
import com.mamaafrica.ai.auth.dto.LoginResponse;
import com.mamaafrica.ai.auth.dto.UserResponse;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.security.JwtService;
import com.mamaafrica.ai.user.User;
import com.mamaafrica.ai.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository users, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        var user = users.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            log.warn("Failed login attempt for {}", request.email());
            throw new BadCredentialsException("Invalid email or password");
        }
        if (!user.isEnabled()) {
            throw new DisabledException("This account is disabled");
        }

        log.info("User {} logged in", user.getEmail());
        return new LoginResponse(
                jwtService.generateToken(user),
                "Bearer",
                jwtService.expiresIn().toSeconds(),
                UserResponse.from(user));
    }

    public UserResponse currentUser(String email) {
        return users.findByEmailIgnoreCase(email)
                .map(UserResponse::from)
                .orElseThrow(() -> new NotFoundException("User not found: " + email));
    }

    public User requireByEmail(String email) {
        return users.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new NotFoundException("User not found: " + email));
    }
}
