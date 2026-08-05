-- Single-row table. Seeded on first start from the AI_* environment variables, after which
-- the database is the source of truth so the admin console can tune the AI without a restart.
CREATE TABLE ai_settings (
    id            BIGINT PRIMARY KEY,
    provider      VARCHAR(32)      NOT NULL,
    base_url      VARCHAR(500)     NOT NULL,
    model         VARCHAR(200)     NOT NULL,
    temperature   DOUBLE PRECISION NOT NULL,
    max_tokens    INTEGER          NOT NULL,
    system_prompt TEXT             NOT NULL,
    rag_enabled   BOOLEAN          NOT NULL,
    chunk_size    INTEGER          NOT NULL,
    chunk_overlap INTEGER          NOT NULL,
    max_results   INTEGER          NOT NULL,
    min_score     DOUBLE PRECISION NOT NULL,
    updated_at    TIMESTAMP        NOT NULL,
    updated_by    VARCHAR(255)
);
