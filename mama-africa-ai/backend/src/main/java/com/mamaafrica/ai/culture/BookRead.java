package com.mamaafrica.ai.culture;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/** One row per e-book open, so the console can report readership over time. */
@Entity
@Table(name = "culture_book_read")
public class BookRead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "read_at", nullable = false, updatable = false)
    private Instant readAt = Instant.now();

    protected BookRead() {
    }

    public static BookRead now() {
        return new BookRead();
    }

    public Long getId() {
        return id;
    }

    public Instant getReadAt() {
        return readAt;
    }
}
