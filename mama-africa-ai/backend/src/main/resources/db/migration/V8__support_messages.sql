-- Support enquiries from the website's help button.
--
-- These used to be sent straight from the browser to EmailJS, throttled by a limiter that
-- also lived in the browser — so anyone who opened devtools could send as many as they liked.
-- That is why the inbox was being flooded. The form now posts here, and the rate limit is a
-- server-side query over this table, which a visitor cannot reach around.
CREATE TABLE support_message (
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(120),
    email      VARCHAR(255) NOT NULL,
    message    TEXT         NOT NULL,
    -- Hashed, never the raw address: enough to rate-limit and spot a flood, without keeping
    -- a log of visitors' IP addresses in plain text.
    client_hash VARCHAR(64),
    status     VARCHAR(16)  NOT NULL DEFAULT 'NEW',
    emailed    BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP    NOT NULL DEFAULT now(),
    handled_at TIMESTAMP,
    handled_by VARCHAR(255),
    CONSTRAINT chk_support_status CHECK (status IN ('NEW', 'HANDLED', 'SPAM'))
);

-- The rate-limit check is "anything from this sender since T?" — both lookups need an index.
CREATE INDEX idx_support_email_time  ON support_message (LOWER(email), created_at DESC);
CREATE INDEX idx_support_client_time ON support_message (client_hash, created_at DESC);
CREATE INDEX idx_support_status      ON support_message (status, created_at DESC);
