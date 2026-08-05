package com.mamaafrica.ai.customer;

import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.customer.dto.ChangeCustomerPasswordRequest;
import com.mamaafrica.ai.customer.dto.CustomerLoginRequest;
import com.mamaafrica.ai.customer.dto.CustomerResponse;
import com.mamaafrica.ai.customer.dto.CustomerSessionResponse;
import com.mamaafrica.ai.customer.dto.SignupRequest;
import com.mamaafrica.ai.customer.dto.UpdateProfileRequest;
import com.mamaafrica.ai.customer.dto.ForgotPasswordRequest;
import com.mamaafrica.ai.customer.dto.ResetPasswordRequest;
import com.mamaafrica.ai.common.ClientFingerprint;
import com.mamaafrica.ai.config.AppProperties;
import com.mamaafrica.ai.mail.MailService;
import com.mamaafrica.ai.policy.PolicyKind;
import com.mamaafrica.ai.policy.PolicyService;
import com.mamaafrica.ai.security.JwtService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Value;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Locale;

@Service
public class CustomerService {

    /** Long enough to be unguessable, short enough that a leaked link stops working quickly. */
    private static final Duration RESET_VALIDITY = Duration.ofHours(1);

    private final CustomerRepository customers;
    private final PasswordResetTokenRepository resetTokens;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MailService mail;
    private final PolicyService policies;
    private final String siteUrl;
    private final String salt;

    public CustomerService(CustomerRepository customers,
                           PasswordResetTokenRepository resetTokens,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService,
                           MailService mail,
                           PolicyService policies,
                           @Value("${app.mail.site-url:http://localhost:3002}") String siteUrl,
                           AppProperties props) {
        this.customers = customers;
        this.resetTokens = resetTokens;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.mail = mail;
        this.policies = policies;
        this.siteUrl = siteUrl.replaceAll("/+$", "");
        this.salt = props.security().jwt().secret();
    }

    /**
     * Starts a reset. Always reports success to the caller: telling someone "no account with
     * that email" turns this endpoint into a way to enumerate who has registered.
     */
    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        String email = normalise(request.email());
        customers.findByEmailIgnoreCase(email).filter(Customer::isEnabled).ifPresent(customer -> {
            // 32 random bytes, URL-safe. The raw value goes into the email and nowhere else.
            var raw = new byte[32];
            new SecureRandom().nextBytes(raw);
            String token = Base64.getUrlEncoder().withoutPadding().encodeToString(raw);

            resetTokens.save(new PasswordResetToken(
                    customer, ClientFingerprint.hash(token, salt), Instant.now().plus(RESET_VALIDITY)));

            mail.send(customer.getEmail(), "Reset your Mama Africa password",
                    "Akwaaba " + customer.preferredName() + ",\n\n"
                    + "Someone asked to reset the password on your Mama Africa account. Open the\n"
                    + "link below within the next hour to choose a new one:\n\n"
                    + siteUrl + "/auth/reset?token=" + token + "\n\n"
                    + "If this was not you, nothing has changed and you can ignore this message.\n\n"
                    + "Mama Africa Official");
        });
    }

    /** Completes a reset. The token is single-use and dies with the change. */
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        var token = resetTokens.findByTokenHash(ClientFingerprint.hash(request.token(), salt))
                .filter(PasswordResetToken::isUsable)
                .orElseThrow(() -> new BadRequestException(
                        "This reset link is no longer valid. Please request a new one."));

        var customer = token.getCustomer();
        customer.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        customer.touch();
        customers.save(customer);

        token.markUsed();
        resetTokens.save(token);
    }

    @Transactional
    public CustomerSessionResponse signup(SignupRequest request) {
        return signup(request, null);
    }

    @Transactional
    public CustomerSessionResponse signup(SignupRequest request, String clientHash) {
        String email = normalise(request.email());
        if (customers.existsByEmailIgnoreCase(email)) {
            throw new BadRequestException("An account with this email already exists.");
        }

        var customer = new Customer(email, passwordEncoder.encode(request.password()), request.fullName().trim());
        customer.setAkanName(blankToNull(request.akanName()));
        customer.setDayBorn(blankToNull(request.dayBorn()));
        customer.setDob(blankToNull(request.dob()));
        customer.recordLogin();

        var saved = customers.save(customer);

        // Consent is recorded in the same transaction as the account. If the required
        // policies were not all accepted this throws, and no account is created — which is
        // the correct outcome: an account that never agreed to anything should not exist.
        policies.recordSignupAcceptance(
                saved.getId(),
                request.acceptedPolicies() == null ? java.util.Set.<PolicyKind>of() : request.acceptedPolicies(),
                clientHash);

        return session(saved);
    }

    @Transactional
    public CustomerSessionResponse login(CustomerLoginRequest request) {
        var customer = customers.findByEmailIgnoreCase(normalise(request.email()))
                // Same message whether the address is unknown or the password is wrong: a
                // different one would turn this endpoint into an account-existence oracle.
                .orElseThrow(() -> new BadCredentialsException("Incorrect email or password."));

        if (!customer.isEnabled() || !passwordEncoder.matches(request.password(), customer.getPasswordHash())) {
            throw new BadCredentialsException("Incorrect email or password.");
        }

        customer.recordLogin();
        return session(customers.save(customer));
    }

    @Transactional(readOnly = true)
    public CustomerResponse profile(Long id) {
        return CustomerResponse.from(require(id));
    }

    @Transactional
    public CustomerResponse updateProfile(Long id, UpdateProfileRequest request) {
        var customer = require(id);
        customer.setFullName(request.fullName().trim());
        customer.setAkanName(blankToNull(request.akanName()));
        customer.setDayBorn(blankToNull(request.dayBorn()));
        customer.setDob(blankToNull(request.dob()));
        customer.touch();
        return CustomerResponse.from(customers.save(customer));
    }

    @Transactional
    public void changePassword(Long id, ChangeCustomerPasswordRequest request) {
        var customer = require(id);
        if (!passwordEncoder.matches(request.currentPassword(), customer.getPasswordHash())) {
            throw new BadRequestException("Your current password is not correct.");
        }
        customer.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        customer.touch();
        customers.save(customer);
    }

    private CustomerSessionResponse session(Customer customer) {
        return new CustomerSessionResponse(
                jwtService.generateCustomerToken(customer),
                jwtService.expiresIn().toSeconds(),
                CustomerResponse.from(customer));
    }

    private Customer require(Long id) {
        return customers.findById(id).orElseThrow(() -> new NotFoundException("Account not found"));
    }

    private static String normalise(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }
}
