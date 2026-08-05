package com.mamaafrica.ai.support;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/** A question sent from the website's support button. */
@Entity
@Table(name = "support_message")
public class SupportMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 120)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    /** Hash of the caller's address — enough to spot a flood, without storing the address. */
    @Column(name = "client_hash", length = 64)
    private String clientHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private SupportStatus status = SupportStatus.NEW;

    @Column(nullable = false)
    private boolean emailed;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "handled_at")
    private Instant handledAt;

    @Column(name = "handled_by")
    private String handledBy;

    protected SupportMessage() {
    }

    public SupportMessage(String name, String email, String message, String clientHash) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.clientHash = clientHash;
    }

    public void markEmailed() {
        this.emailed = true;
    }

    public void resolve(SupportStatus status, String actor) {
        this.status = status;
        this.handledAt = Instant.now();
        this.handledBy = actor;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    public SupportStatus getStatus() {
        return status;
    }

    public boolean isEmailed() {
        return emailed;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getHandledAt() {
        return handledAt;
    }

    public String getHandledBy() {
        return handledBy;
    }
}
