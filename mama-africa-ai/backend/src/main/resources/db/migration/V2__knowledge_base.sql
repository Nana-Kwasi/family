CREATE TABLE knowledge_categories (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(120) NOT NULL,
    slug        VARCHAR(120) NOT NULL UNIQUE,
    description VARCHAR(500),
    created_at  TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE knowledge_documents (
    id            UUID PRIMARY KEY,
    title         VARCHAR(255) NOT NULL,
    file_name     VARCHAR(255) NOT NULL,
    content_type  VARCHAR(120),
    size_bytes    BIGINT       NOT NULL,
    category_id   BIGINT REFERENCES knowledge_categories (id) ON DELETE SET NULL,
    -- Extracted text is kept so documents can be re-indexed without re-uploading the file.
    content       TEXT         NOT NULL,
    chunk_count   INTEGER      NOT NULL DEFAULT 0,
    status        VARCHAR(16)  NOT NULL,
    error_message VARCHAR(1000),
    uploaded_by   VARCHAR(255),
    created_at    TIMESTAMP    NOT NULL,
    updated_at    TIMESTAMP    NOT NULL
);

CREATE INDEX idx_knowledge_documents_status ON knowledge_documents (status);
CREATE INDEX idx_knowledge_documents_category ON knowledge_documents (category_id);

INSERT INTO knowledge_categories (name, slug, description) VALUES
    ('History',        'history',        'African and Ghanaian history'),
    ('Culture',        'culture',        'Traditions, customs, symbols and beliefs'),
    ('Kingdoms',       'kingdoms',       'Ashanti, Dagbon, Ga and other kingdoms'),
    ('Tourism',        'tourism',        'Places to visit, landmarks and travel guidance'),
    ('Languages',      'languages',      'Twi, Ga, Ewe, Dagbani and other languages'),
    ('Museums',        'museums',        'Museums, monuments and heritage sites'),
    ('Music',          'music',          'Music, drumming, dance and instruments'),
    ('Store Products', 'store-products', 'Mama Africa product catalogue'),
    ('FAQs',           'faqs',           'Frequently asked questions'),
    ('Blog',           'blog',           'Articles and blog posts');
