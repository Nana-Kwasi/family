package com.mamaafrica.ai.market;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    boolean existsBySlug(String slug);

    @Query("SELECT p FROM Promotion p ORDER BY p.sortOrder, p.id")
    List<Promotion> findAllOrdered();

    /**
     * Everything the storefront may render right now. The window is filtered in SQL rather
     * than in {@link Promotion#isLiveAt} so an inactive catalogue of old campaigns costs nothing.
     */
    @Query("""
            SELECT p FROM Promotion p
            WHERE p.active = TRUE
              AND (p.startsAt IS NULL OR p.startsAt <= :now)
              AND (p.endsAt   IS NULL OR p.endsAt   >= :now)
            ORDER BY p.sortOrder, p.id
            """)
    List<Promotion> findLive(@Param("now") Instant now);
}
