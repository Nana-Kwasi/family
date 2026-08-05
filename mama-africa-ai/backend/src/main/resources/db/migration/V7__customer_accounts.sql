-- Website visitor accounts. Deliberately a separate table from `users`, which holds admin
-- console operators: the two populations have nothing to do with each other, and keeping
-- one table with a role column would mean a single mistake in a role check could hand a
-- shopper the keys to the admin API.
CREATE TABLE customer (
    id            BIGSERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name     VARCHAR(255) NOT NULL,
    -- Remembered from the day-name calculator so Afia can greet people properly.
    akan_name     VARCHAR(120),
    day_born      VARCHAR(16),
    dob           VARCHAR(32),
    enabled       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT now(),
    last_login_at TIMESTAMP
);

-- Sign-in is looked up by lower(email); without this index every attempt is a sequential scan.
CREATE UNIQUE INDEX idx_customer_email_lower ON customer (LOWER(email));
