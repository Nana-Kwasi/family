-- Site policies, drafted in the admin console and shown to visitors at sign-up.
--
-- Versioned rather than edited in place. Consent is only meaningful against the exact words
-- somebody was shown: if an admin rewrites the privacy policy, the acceptance recorded last
-- year did not cover the new text. Publishing a change mints a new version, and the record of
-- who accepted which version stays truthful.
CREATE TABLE policy (
    id            BIGSERIAL PRIMARY KEY,
    kind          VARCHAR(32)  NOT NULL UNIQUE,
    title         VARCHAR(255) NOT NULL,
    summary       VARCHAR(500),
    body          TEXT         NOT NULL,
    -- Bumped on every publish. Acceptances point at a number, not at a row that can change.
    version       INTEGER      NOT NULL DEFAULT 1,
    -- Must a new account tick this before it can be created?
    required_at_signup BOOLEAN NOT NULL DEFAULT TRUE,
    published     BOOLEAN      NOT NULL DEFAULT FALSE,
    sort_order    INTEGER      NOT NULL DEFAULT 0,
    created_at    TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT now(),
    updated_by    VARCHAR(255),
    published_at  TIMESTAMP,
    CONSTRAINT chk_policy_kind CHECK (kind IN (
        'TERMS', 'PRIVACY', 'COOKIES', 'AI_ASSISTANT', 'DATA_PROCESSING',
        'CONTENT_SUBMISSION', 'SHIPPING_RETURNS', 'MARKETING'))
);

-- What each visitor agreed to, and when. Kept even if the policy is later rewritten.
CREATE TABLE policy_acceptance (
    id             BIGSERIAL PRIMARY KEY,
    customer_id    BIGINT      NOT NULL REFERENCES customer (id) ON DELETE CASCADE,
    policy_id      BIGINT      NOT NULL REFERENCES policy (id),
    policy_kind    VARCHAR(32) NOT NULL,
    -- Denormalised on purpose: the version accepted must survive the policy being edited.
    policy_version INTEGER     NOT NULL,
    accepted_at    TIMESTAMP   NOT NULL DEFAULT now(),
    -- Hashed, never the raw address — same reasoning as support_message.
    client_hash    VARCHAR(64),
    CONSTRAINT uq_acceptance UNIQUE (customer_id, policy_id, policy_version)
);

CREATE INDEX idx_acceptance_customer ON policy_acceptance (customer_id, accepted_at DESC);

-- Seeded as drafts so nothing appears on the website until an admin has read and published it.
-- The bodies are deliberately short placeholders: real policy text is the owner's to write.
INSERT INTO policy (kind, title, summary, body, required_at_signup, published, sort_order) VALUES
('TERMS', 'Terms of Service',
 'The agreement between you and Mama Africa Official.',
 'Draft. Replace this with your terms of service before publishing.', TRUE, FALSE, 0),
('PRIVACY', 'Privacy Policy',
 'What we collect, why, and what we never do with it.',
 'Draft. Replace this with your privacy policy before publishing.', TRUE, FALSE, 1),
('COOKIES', 'Cookie Policy',
 'The cookies this site sets and what they are for.',
 'Draft. Replace this with your cookie policy before publishing.', FALSE, FALSE, 2),
('AI_ASSISTANT', 'AI Assistant (Afia)',
 'How Afia works, what she can see, and what is stored.',
 'Draft. Afia is an AI assistant. Conversations are stored so the team can improve her answers. '
 'She is not a person and cannot see your order. Replace this with your full policy before publishing.',
 TRUE, FALSE, 3),
('DATA_PROCESSING', 'How We Handle Your Data',
 'Where your details are stored and who can reach them.',
 'Draft. Replace this before publishing.', FALSE, FALSE, 4),
('CONTENT_SUBMISSION', 'Sharing Your Story',
 'What happens to a diaspora story or review you submit.',
 'Draft. Submissions appear publicly on the site and may be removed by the team. '
 'Replace this before publishing.', FALSE, FALSE, 5),
('SHIPPING_RETURNS', 'Shipping & Returns',
 'Production times, delivery windows and damaged items.',
 'Draft. Replace this before publishing.', FALSE, FALSE, 6),
('MARKETING', 'Email & Marketing',
 'What we send, and how to stop it.',
 'Draft. Replace this before publishing.', FALSE, FALSE, 7);
