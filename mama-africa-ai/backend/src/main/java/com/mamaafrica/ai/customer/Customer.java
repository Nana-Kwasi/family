package com.mamaafrica.ai.customer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/**
 * Someone with an account on the website. Deliberately separate from
 * {@code com.mamaafrica.ai.user.User}, which is an admin-console operator — see V7 for why.
 */
@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "akan_name", length = 120)
    private String akanName;

    @Column(name = "day_born", length = 16)
    private String dayBorn;

    @Column(length = 32)
    private String dob;

    @Column(nullable = false)
    private boolean enabled = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    @Column(name = "last_login_at")
    private Instant lastLoginAt;

    protected Customer() {
    }

    public Customer(String email, String passwordHash, String fullName) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
    }

    /** The name Afia should use. Falls back to the first word of the full name. */
    public String preferredName() {
        if (akanName != null && !akanName.isBlank()) {
            return akanName.trim();
        }
        return fullName.trim().split("\\s+")[0];
    }

    public void recordLogin() {
        this.lastLoginAt = Instant.now();
    }

    public void touch() {
        this.updatedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAkanName() {
        return akanName;
    }

    public void setAkanName(String akanName) {
        this.akanName = akanName;
    }

    public String getDayBorn() {
        return dayBorn;
    }

    public void setDayBorn(String dayBorn) {
        this.dayBorn = dayBorn;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getLastLoginAt() {
        return lastLoginAt;
    }
}
