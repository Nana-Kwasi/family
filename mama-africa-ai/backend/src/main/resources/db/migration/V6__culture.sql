-- Mama Africa Culture. These used to be Firestore collections written straight from the
-- website, with the posting screens living at /admin/* on the site itself. Both move here:
-- the console authors the content, and the website only reads it.

-- Stories and proverbs, authored by an admin.
CREATE TABLE culture_story (
    id           BIGSERIAL PRIMARY KEY,
    slug         VARCHAR(200) NOT NULL UNIQUE,
    kind         VARCHAR(16)  NOT NULL,
    title        VARCHAR(255),
    content      TEXT         NOT NULL,
    -- Which shelf the website files it under.
    content_type VARCHAR(48)  NOT NULL DEFAULT 'GENERAL',
    published    BOOLEAN      NOT NULL DEFAULT TRUE,
    author       VARCHAR(255),
    sort_order   INTEGER      NOT NULL DEFAULT 0,
    created_at   TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT now(),
    updated_by   VARCHAR(255),
    CONSTRAINT chk_story_kind CHECK (kind IN ('STORY', 'PROVERB')),
    CONSTRAINT chk_story_content_type CHECK (
        content_type IN ('GENERAL', 'CULTURAL_STORYBOOK', 'DIASPORA_LEARNING_EDITION'))
);
CREATE INDEX idx_culture_story_feed ON culture_story (published, created_at DESC);

-- A long story can be split into chapters; a proverb never is.
CREATE TABLE culture_story_chapter (
    story_id BIGINT       NOT NULL REFERENCES culture_story (id) ON DELETE CASCADE,
    heading  VARCHAR(255),
    content  TEXT         NOT NULL,
    position INTEGER      NOT NULL,
    PRIMARY KEY (story_id, position)
);

CREATE TABLE culture_story_link (
    story_id BIGINT       NOT NULL REFERENCES culture_story (id) ON DELETE CASCADE,
    label    VARCHAR(120) NOT NULL,
    url      VARCHAR(1000) NOT NULL,
    position INTEGER      NOT NULL,
    PRIMARY KEY (story_id, position)
);

-- Visitor-submitted stories from the diaspora page. The submission flow is unchanged — a
-- visitor writes and it appears — so these default to APPROVED. The status column exists so
-- an admin can take one down from the console afterwards, not to hold submissions back.
CREATE TABLE culture_diaspora_story (
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(120) NOT NULL,
    country    VARCHAR(120),
    akan_name  VARCHAR(120),
    story      TEXT         NOT NULL,
    status     VARCHAR(16)  NOT NULL DEFAULT 'APPROVED',
    created_at TIMESTAMP    NOT NULL DEFAULT now(),
    reviewed_at TIMESTAMP,
    reviewed_by VARCHAR(255),
    CONSTRAINT chk_diaspora_status CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'))
);
CREATE INDEX idx_diaspora_status ON culture_diaspora_story (status, created_at DESC);

-- Every rating the site collects, in one table so the console moderates them in one screen.
-- subject_id is null for BOOK: the e-book is a single thing, not one row among many.
--
-- Ratings default to APPROVED, matching how the site behaves today — a star rating with a
-- short comment is far lower risk than a submitted story, and holding them back would make
-- the review lists look broken. An admin can still reject one.
CREATE TABLE culture_review (
    id            BIGSERIAL PRIMARY KEY,
    subject       VARCHAR(16)  NOT NULL,
    subject_id    BIGINT,
    subject_title VARCHAR(255),
    author_name   VARCHAR(120) NOT NULL,
    rating        SMALLINT     NOT NULL,
    comment       TEXT,
    status        VARCHAR(16)  NOT NULL DEFAULT 'APPROVED',
    created_at    TIMESTAMP    NOT NULL DEFAULT now(),
    reviewed_at   TIMESTAMP,
    reviewed_by   VARCHAR(255),
    CONSTRAINT chk_review_subject CHECK (subject IN ('STORY', 'BOOK', 'DIASPORA')),
    CONSTRAINT chk_review_status  CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    CONSTRAINT chk_review_rating  CHECK (rating BETWEEN 1 AND 5)
);
CREATE INDEX idx_review_subject ON culture_review (subject, subject_id, status, created_at DESC);

-- Newsletter sign-ups from the email-capture cards.
CREATE TABLE culture_subscriber (
    id         BIGSERIAL PRIMARY KEY,
    email      VARCHAR(255) NOT NULL UNIQUE,
    akan_name  VARCHAR(120),
    day_born   VARCHAR(16),
    dob        VARCHAR(32),
    source     VARCHAR(120),
    created_at TIMESTAMP    NOT NULL DEFAULT now()
);

-- One row per e-book open, so the console can report readership.
CREATE TABLE culture_book_read (
    id      BIGSERIAL PRIMARY KEY,
    read_at TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_book_read_at ON culture_book_read (read_at DESC);
