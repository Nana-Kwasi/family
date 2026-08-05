package com.mamaafrica.ai.culture;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/** An email captured by one of the newsletter cards. Email is unique — re-signing is a no-op. */
@Entity
@Table(name = "culture_subscriber")
public class Subscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "akan_name", length = 120)
    private String akanName;

    @Column(name = "day_born", length = 16)
    private String dayBorn;

    @Column(length = 32)
    private String dob;

    @Column(length = 120)
    private String source;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected Subscriber() {
    }

    public Subscriber(String email, String akanName, String dayBorn, String dob, String source) {
        this.email = email;
        this.akanName = akanName;
        this.dayBorn = dayBorn;
        this.dob = dob;
        this.source = source;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getAkanName() {
        return akanName;
    }

    public String getDayBorn() {
        return dayBorn;
    }

    public String getDob() {
        return dob;
    }

    public String getSource() {
        return source;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
