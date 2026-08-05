package com.mamaafrica.ai.culture;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface DiasporaStoryRepository extends JpaRepository<DiasporaStory, Long> {

    @Query("SELECT d FROM DiasporaStory d WHERE d.status = 'APPROVED' ORDER BY d.createdAt DESC")
    List<DiasporaStory> findPublic();

    @Query("SELECT d FROM DiasporaStory d WHERE (:status IS NULL OR d.status = :status)")
    Page<DiasporaStory> search(@Param("status") ModerationStatus status, Pageable pageable);

    long countByStatus(ModerationStatus status);

    /** Abuse guard: how many submissions this name has made recently. */
    long countByNameIgnoreCaseAndCreatedAtAfter(String name, Instant since);
}
