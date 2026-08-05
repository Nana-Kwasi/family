-- Password reset tokens for website accounts.
--
-- The token is stored hashed. A reset token is a bearer credential for the length of its life:
-- anyone reading this table with plaintext tokens could take over any account that had asked
-- for a reset. Only the hash is kept, and the raw value exists solely inside the email.
CREATE TABLE password_reset_token (
    id          BIGSERIAL PRIMARY KEY,
    customer_id BIGINT      NOT NULL REFERENCES customer (id) ON DELETE CASCADE,
    token_hash  VARCHAR(64) NOT NULL UNIQUE,
    expires_at  TIMESTAMP   NOT NULL,
    used_at     TIMESTAMP,
    created_at  TIMESTAMP   NOT NULL DEFAULT now()
);

CREATE INDEX idx_reset_customer ON password_reset_token (customer_id, created_at DESC);
