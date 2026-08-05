-- Mama Africa Market. The website's storefront used to be a hand-maintained JavaScript file
-- (src/data/products.js); it now lives here so the admin console owns the catalogue.
--
-- Image columns hold web paths (e.g. /images/friday-borns/kofi/kofi-1.png), not binary data.
-- The files stay where they are and keep being served as static assets by the website.

CREATE TABLE market_product (
    id            BIGSERIAL PRIMARY KEY,
    legacy_id     INTEGER      UNIQUE,
    slug          VARCHAR(200) NOT NULL UNIQUE,
    name          VARCHAR(255) NOT NULL,
    born_day      VARCHAR(16),
    collection    VARCHAR(120),
    product_type  VARCHAR(32)  NOT NULL,
    type_label    VARCHAR(64)  NOT NULL,
    tagline       VARCHAR(255),
    card_blurb    VARCHAR(255),
    description   TEXT,
    -- Money in minor units. Never float: 20.10 has no exact binary representation.
    price_cents   INTEGER      NOT NULL DEFAULT 0,
    currency      VARCHAR(3)   NOT NULL DEFAULT 'USD',
    primary_image VARCHAR(500),
    amazon_url    VARCHAR(1000),
    etsy_url      VARCHAR(1000),
    printify_url  VARCHAR(1000),
    sold_out      BOOLEAN      NOT NULL DEFAULT FALSE,
    active        BOOLEAN      NOT NULL DEFAULT TRUE,
    featured      BOOLEAN      NOT NULL DEFAULT FALSE,
    sort_order    INTEGER      NOT NULL DEFAULT 0,
    created_at    TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT now(),
    updated_by    VARCHAR(255)
);

-- The storefront's two hot paths: "today's day-borns" and "browse by type".
CREATE INDEX idx_market_product_day    ON market_product (born_day, active, sold_out);
CREATE INDEX idx_market_product_type   ON market_product (product_type, active);
CREATE INDEX idx_market_product_sort   ON market_product (sort_order, id);

-- Gallery images. position 0 is shown first; primary_image is denormalised onto the
-- product so a card render does not need this table at all.
CREATE TABLE market_product_image (
    product_id BIGINT       NOT NULL REFERENCES market_product (id) ON DELETE CASCADE,
    url        VARCHAR(500) NOT NULL,
    position   INTEGER      NOT NULL,
    PRIMARY KEY (product_id, position)
);

CREATE TABLE market_product_size (
    product_id BIGINT      NOT NULL REFERENCES market_product (id) ON DELETE CASCADE,
    label      VARCHAR(32) NOT NULL,
    position   INTEGER     NOT NULL,
    PRIMARY KEY (product_id, position)
);

-- Free-text bullets on the product page. Two tables rather than one discriminated table:
-- same shape, but a discriminator maps badly onto a JPA element collection.
CREATE TABLE market_product_detail (
    product_id BIGINT       NOT NULL REFERENCES market_product (id) ON DELETE CASCADE,
    text       VARCHAR(255) NOT NULL,
    position   INTEGER      NOT NULL,
    PRIMARY KEY (product_id, position)
);

CREATE TABLE market_product_perfect_for (
    product_id BIGINT       NOT NULL REFERENCES market_product (id) ON DELETE CASCADE,
    text       VARCHAR(255) NOT NULL,
    position   INTEGER      NOT NULL,
    PRIMARY KEY (product_id, position)
);

CREATE TABLE market_size_chart_row (
    product_id BIGINT      NOT NULL REFERENCES market_product (id) ON DELETE CASCADE,
    size       VARCHAR(32) NOT NULL,
    us_chest   VARCHAR(32),
    eu_chest   VARCHAR(32),
    us_length  VARCHAR(32),
    eu_length  VARCHAR(32),
    position   INTEGER     NOT NULL,
    PRIMARY KEY (product_id, position)
);

CREATE TABLE market_bundle (
    id          BIGSERIAL PRIMARY KEY,
    slug        VARCHAR(200) NOT NULL UNIQUE,
    title       VARCHAR(255) NOT NULL,
    subtitle    VARCHAR(255),
    description TEXT,
    active      BOOLEAN      NOT NULL DEFAULT TRUE,
    sort_order  INTEGER      NOT NULL DEFAULT 0,
    created_at  TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE market_bundle_item (
    bundle_id  BIGINT  NOT NULL REFERENCES market_bundle (id)  ON DELETE CASCADE,
    product_id BIGINT  NOT NULL REFERENCES market_product (id) ON DELETE CASCADE,
    position   INTEGER NOT NULL,
    PRIMARY KEY (bundle_id, position)
);
CREATE INDEX idx_market_bundle_item_product ON market_bundle_item (product_id);

-- Promotions drive the announcement strip and any badge shown on a card. A promotion is
-- "live" when active = TRUE and now() falls inside [starts_at, ends_at] — either bound may
-- be NULL, meaning open-ended. Placement decides where the website renders it.
CREATE TABLE market_promotion (
    id           BIGSERIAL PRIMARY KEY,
    slug         VARCHAR(200) NOT NULL UNIQUE,
    headline     VARCHAR(255) NOT NULL,
    body         TEXT,
    badge_label  VARCHAR(64),
    placement    VARCHAR(32)  NOT NULL DEFAULT 'ANNOUNCEMENT_STRIP',
    cta_label    VARCHAR(64),
    cta_url      VARCHAR(1000),
    -- Optional scoping: NULL means the promotion is site-wide.
    target_type  VARCHAR(32),
    target_value VARCHAR(200),
    discount_pct INTEGER,
    starts_at    TIMESTAMP,
    ends_at      TIMESTAMP,
    active       BOOLEAN      NOT NULL DEFAULT TRUE,
    sort_order   INTEGER      NOT NULL DEFAULT 0,
    created_at   TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT now(),
    updated_by   VARCHAR(255),
    CONSTRAINT chk_promo_placement CHECK (
        placement IN ('ANNOUNCEMENT_STRIP', 'STORE_HERO', 'PRODUCT_BADGE', 'WELCOME_POPUP')),
    CONSTRAINT chk_promo_target CHECK (
        target_type IS NULL OR target_type IN ('PRODUCT', 'BORN_DAY', 'PRODUCT_TYPE', 'COLLECTION', 'BUNDLE')),
    CONSTRAINT chk_promo_discount CHECK (discount_pct IS NULL OR (discount_pct BETWEEN 0 AND 100)),
    CONSTRAINT chk_promo_window   CHECK (starts_at IS NULL OR ends_at IS NULL OR ends_at > starts_at)
);
CREATE INDEX idx_market_promo_live ON market_promotion (active, starts_at, ends_at);
