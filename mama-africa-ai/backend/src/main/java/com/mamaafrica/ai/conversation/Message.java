package com.mamaafrica.ai.conversation;

import com.mamaafrica.ai.language.Language;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "conversation_id", nullable = false)
    private UUID conversationId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private MessageRole role;

    @Column(nullable = false, columnDefinition = "text")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(length = 16)
    private Language language;

    @Column(length = 128)
    private String model;

    @Column(name = "latency_ms")
    private Long latencyMs;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected Message() {
    }

    private Message(UUID conversationId, MessageRole role, String content, Language language) {
        this.conversationId = conversationId;
        this.role = role;
        this.content = content;
        this.language = language;
    }

    public static Message user(UUID conversationId, String content, Language language) {
        return new Message(conversationId, MessageRole.USER, content, language);
    }

    public static Message assistant(UUID conversationId, String content, Language language,
                                    String model, long latencyMs) {
        var message = new Message(conversationId, MessageRole.ASSISTANT, content, language);
        message.model = model;
        message.latencyMs = latencyMs;
        return message;
    }

    public Long getId() {
        return id;
    }

    public UUID getConversationId() {
        return conversationId;
    }

    public MessageRole getRole() {
        return role;
    }

    public String getContent() {
        return content;
    }

    public Language getLanguage() {
        return language;
    }

    public String getModel() {
        return model;
    }

    public Long getLatencyMs() {
        return latencyMs;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
