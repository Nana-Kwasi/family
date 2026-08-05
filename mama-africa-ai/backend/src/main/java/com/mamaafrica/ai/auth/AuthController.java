package com.mamaafrica.ai.auth;

import com.mamaafrica.ai.auth.dto.LoginRequest;
import com.mamaafrica.ai.auth.dto.LoginResponse;
import com.mamaafrica.ai.auth.dto.UserResponse;
import com.mamaafrica.ai.user.UserService;
import com.mamaafrica.ai.user.dto.ChangePasswordRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.mamaafrica.ai.common.ClientFingerprint;
import com.mamaafrica.ai.common.RateLimiter;
import com.mamaafrica.ai.config.AppProperties;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final RateLimiter rateLimiter;
    private final String salt;

    public AuthController(AuthService authService, UserService userService,
                          RateLimiter rateLimiter, AppProperties props) {
        this.authService = authService;
        this.userService = userService;
        this.rateLimiter = rateLimiter;
        this.salt = props.security().jwt().secret();
    }

    @PostMapping("/login")
    @Operation(summary = "Exchange admin credentials for a JWT")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request,
                                               HttpServletRequest http) {
        // The admin sign-in is the highest-value guess on the whole system, so it is throttled
        // hardest — but only failures count, and a success wipes the slate. Otherwise an
        // administrator signing in normally would spend the same budget as the attacker.
        var key = "admin-login:" + ClientFingerprint.of(http, salt);
        rateLimiter.checkOnly(key, 8, Duration.ofHours(1));
        try {
            var response = ResponseEntity.ok(authService.login(request));
            rateLimiter.clear(key);
            return response;
        } catch (RuntimeException e) {
            rateLimiter.record(key);
            throw e;
        }
    }

    @GetMapping("/me")
    @Operation(summary = "Profile of the authenticated admin")
    public ResponseEntity<UserResponse> me(@AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(authService.currentUser(principal.getUsername()));
    }

    @PutMapping("/password")
    @Operation(summary = "Change your own password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordRequest request,
                                               @AuthenticationPrincipal UserDetails principal) {
        userService.changePassword(principal.getUsername(), request);
        return ResponseEntity.noContent().build();
    }
}
