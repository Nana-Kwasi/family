package com.mamaafrica.ai.support;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;

public interface SupportMessageRepository extends JpaRepository<SupportMessage, Long> {

    /** Rate-limit probe: how many this sender has sent since a point in time. */
    @Query("SELECT COUNT(m) FROM SupportMessage m WHERE LOWER(m.email) = :email AND m.createdAt >= :since")
    long countByEmailSince(@Param("email") String email, @Param("since") Instant since);

    /**
     * The same probe by caller rather than by address. Without it, one abuser simply varies
     * the email on each send and the per-address limit never trips.
     */
    @Query("SELECT COUNT(m) FROM SupportMessage m WHERE m.clientHash = :clientHash AND m.createdAt >= :since")
    long countByClientSince(@Param("clientHash") String clientHash, @Param("since") Instant since);

    @Query("SELECT m FROM SupportMessage m WHERE (:status IS NULL OR m.status = :status)")
    Page<SupportMessage> search(@Param("status") SupportStatus status, Pageable pageable);

    long countByStatus(SupportStatus status);
}
