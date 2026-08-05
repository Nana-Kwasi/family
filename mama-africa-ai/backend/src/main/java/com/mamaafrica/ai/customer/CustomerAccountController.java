package com.mamaafrica.ai.customer;

import com.mamaafrica.ai.customer.dto.ChangeCustomerPasswordRequest;
import com.mamaafrica.ai.customer.dto.CustomerLoginRequest;
import com.mamaafrica.ai.customer.dto.CustomerResponse;
import com.mamaafrica.ai.customer.dto.CustomerSessionResponse;
import com.mamaafrica.ai.customer.dto.ForgotPasswordRequest;
import com.mamaafrica.ai.customer.dto.ResetPasswordRequest;
import com.mamaafrica.ai.customer.dto.SignupRequest;
import com.mamaafrica.ai.customer.dto.UpdateProfileRequest;
import com.mamaafrica.ai.common.ClientFingerprint;
import com.mamaafrica.ai.common.RateLimiter;
import com.mamaafrica.ai.config.AppProperties;
import com.mamaafrica.ai.security.CustomerPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Map;

/**
 * Website accounts. Sign-up and sign-in are open; everything else needs a customer token.
 *
 * <p>Separate from {@code /api/auth}, which is the admin console's sign-in. A token minted
 * here can never authenticate against the admin API — see {@code JwtAuthenticationFilter}.
 */
@RestController
@RequestMapping("/api/account")
@Tag(name = "Customer accounts")
public class CustomerAccountController {

    /**
     * Sign-in is the one endpoint where guessing pays, so it is the one that must be throttled.
     * Ten attempts an hour from one caller is generous for a forgotten password and useless
     * for a password-spraying script.
     */
    private static final Duration WINDOW = Duration.ofHours(1);
    private static final int LOGIN_LIMIT = 10;
    private static final int SIGNUP_LIMIT = 5;

    private final CustomerService customers;
    private final RateLimiter rateLimiter;
    private final String salt;

    public CustomerAccountController(CustomerService customers, RateLimiter rateLimiter, AppProperties props) {
        this.customers = customers;
        this.rateLimiter = rateLimiter;
        this.salt = props.security().jwt().secret();
    }

    private void limit(String action, int max, HttpServletRequest http) {
        rateLimiter.check(action + ':' + ClientFingerprint.of(http, salt), max, WINDOW);
    }

    @PostMapping("/signup")
    @Operation(summary = "Create a website account")
    public ResponseEntity<CustomerSessionResponse> signup(@Valid @RequestBody SignupRequest request,
                                                          HttpServletRequest http) {
        limit("signup", SIGNUP_LIMIT, http);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(customers.signup(request, ClientFingerprint.of(http, salt)));
    }

    @PostMapping("/login")
    @Operation(summary = "Sign in")
    public ResponseEntity<CustomerSessionResponse> login(@Valid @RequestBody CustomerLoginRequest request,
                                                         HttpServletRequest http) {
        // Only failed attempts count, and a success clears them — see AuthController.
        var key = "account-login:" + ClientFingerprint.of(http, salt);
        rateLimiter.checkOnly(key, LOGIN_LIMIT, WINDOW);
        try {
            var response = ResponseEntity.ok(customers.login(request));
            rateLimiter.clear(key);
            return response;
        } catch (RuntimeException e) {
            rateLimiter.record(key);
            throw e;
        }
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Request a password-reset link")
    public ResponseEntity<Map<String, String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request,
                                                              HttpServletRequest http) {
        limit("forgot-password", 5, http);
        customers.forgotPassword(request);
        // Always the same answer, whether or not the address is registered.
        return ResponseEntity.ok(Map.of(
                "message", "If that email has an account, a reset link is on its way."));
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Set a new password using a reset token")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest request,
                                              HttpServletRequest http) {
        limit("reset-password", 10, http);
        customers.resetPassword(request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    @Operation(summary = "The signed-in customer's profile")
    public ResponseEntity<CustomerResponse> me(@AuthenticationPrincipal CustomerPrincipal principal) {
        return ResponseEntity.ok(customers.profile(principal.id()));
    }

    @PutMapping("/me")
    @Operation(summary = "Update your details")
    public ResponseEntity<CustomerResponse> updateProfile(@AuthenticationPrincipal CustomerPrincipal principal,
                                                          @Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(customers.updateProfile(principal.id(), request));
    }

    @PutMapping("/me/password")
    @Operation(summary = "Change your password")
    public ResponseEntity<Void> changePassword(@AuthenticationPrincipal CustomerPrincipal principal,
                                               @Valid @RequestBody ChangeCustomerPasswordRequest request) {
        customers.changePassword(principal.id(), request);
        return ResponseEntity.noContent().build();
    }
}
