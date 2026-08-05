CREATE TABLE users (
    id            BIGSERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name     VARCHAR(255),
    role          VARCHAR(32)  NOT NULL,
    enabled       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE conversations (
    id         UUID PRIMARY KEY,
    title      VARCHAR(255),
    language   VARCHAR(16) NOT NULL,
    model      VARCHAR(128),
    provider   VARCHAR(32),
    created_at TIMESTAMP   NOT NULL,
    updated_at TIMESTAMP   NOT NULL
);

CREATE TABLE messages (
    id              BIGSERIAL PRIMARY KEY,
    conversation_id UUID        NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
    role            VARCHAR(16) NOT NULL,
    content         TEXT        NOT NULL,
    language        VARCHAR(16),
    model           VARCHAR(128),
    latency_ms      BIGINT,
    created_at      TIMESTAMP   NOT NULL
);

CREATE INDEX idx_messages_conversation ON messages (conversation_id, created_at);
CREATE INDEX idx_conversations_updated ON conversations (updated_at DESC);
