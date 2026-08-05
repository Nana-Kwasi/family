package com.mamaafrica.ai.user;

import com.mamaafrica.ai.auth.dto.UserResponse;
import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.user.dto.ChangePasswordRequest;
import com.mamaafrica.ai.user.dto.CreateUserRequest;
import com.mamaafrica.ai.user.dto.UpdateUserRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserResponse> list() {
        return users.findAll().stream().map(UserResponse::from).toList();
    }

    @Transactional
    public UserResponse create(CreateUserRequest request) {
        if (users.existsByEmailIgnoreCase(request.email())) {
            throw new BadRequestException("An account with that email already exists");
        }
        var user = users.save(new User(
                request.email().trim(),
                passwordEncoder.encode(request.password()),
                request.fullName().trim(),
                request.role()));

        log.info("Created {} account for {}", request.role(), request.email());
        return UserResponse.from(user);
    }

    @Transactional
    public UserResponse update(Long id, UpdateUserRequest request, String actingUserEmail) {
        var user = require(id);

        // Without this an admin could lock themselves — and possibly everyone — out.
        if (user.getEmail().equalsIgnoreCase(actingUserEmail)) {
            if (!request.enabled()) {
                throw new BadRequestException("You cannot disable your own account");
            }
            if (request.role() != user.getRole()) {
                throw new BadRequestException("You cannot change your own role");
            }
        }

        user.setFullName(request.fullName().trim());
        user.setRole(request.role());
        user.setEnabled(request.enabled());
        return UserResponse.from(users.save(user));
    }

    @Transactional
    public void delete(Long id, String actingUserEmail) {
        var user = require(id);
        if (user.getEmail().equalsIgnoreCase(actingUserEmail)) {
            throw new BadRequestException("You cannot delete your own account");
        }
        users.delete(user);
        log.info("Deleted account {}", user.getEmail());
    }

    @Transactional
    public void changePassword(String email, ChangePasswordRequest request) {
        var user = users.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new NotFoundException("User not found: " + email));

        if (!passwordEncoder.matches(request.currentPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Current password is incorrect");
        }

        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        users.save(user);
        log.info("Password changed for {}", email);
    }

    private User require(Long id) {
        return users.findById(id).orElseThrow(() -> new NotFoundException("User not found: " + id));
    }
}
