package com.mamaafrica.ai.culture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;

public interface BookReadRepository extends JpaRepository<BookRead, Long> {

    @Query("SELECT COUNT(b) FROM BookRead b WHERE b.readAt >= :since")
    long countSince(@Param("since") Instant since);
}
