package com.mamaafrica.ai.market;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BundleRepository extends JpaRepository<Bundle, Long> {

    boolean existsBySlug(String slug);

    @EntityGraph(attributePaths = {"items"})
    Optional<Bundle> findWithItemsBySlug(String slug);

    @EntityGraph(attributePaths = {"items"})
    Optional<Bundle> findWithItemsById(Long id);

    @EntityGraph(attributePaths = {"items"})
    @Query("SELECT b FROM Bundle b ORDER BY b.sortOrder, b.id")
    List<Bundle> findAllOrdered();

    @EntityGraph(attributePaths = {"items"})
    @Query("SELECT b FROM Bundle b WHERE b.active = TRUE ORDER BY b.sortOrder, b.id")
    List<Bundle> findActiveOrdered();
}
