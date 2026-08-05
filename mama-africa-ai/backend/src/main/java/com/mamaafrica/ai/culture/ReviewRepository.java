package com.mamaafrica.ai.culture;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    /** Approved ratings for one subject. subjectId is null for the e-book. */
    @Query("""
            SELECT r FROM Review r
            WHERE r.subject = :subject
              AND (:subjectId IS NULL OR r.subjectId = :subjectId)
              AND r.status = 'APPROVED'
            ORDER BY r.createdAt DESC
            """)
    List<Review> findPublic(@Param("subject") ReviewSubject subject, @Param("subjectId") Long subjectId);

    @Query("""
            SELECT r FROM Review r
            WHERE (:subject IS NULL OR r.subject = :subject)
              AND (:status  IS NULL OR r.status  = :status)
            """)
    Page<Review> search(@Param("subject") ReviewSubject subject,
                        @Param("status") ModerationStatus status,
                        Pageable pageable);

    long countByStatus(ModerationStatus status);
}
