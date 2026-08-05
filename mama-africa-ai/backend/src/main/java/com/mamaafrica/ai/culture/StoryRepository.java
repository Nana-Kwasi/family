package com.mamaafrica.ai.culture;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, Long> {

    boolean existsBySlug(String slug);

    @EntityGraph(attributePaths = {"chapters", "socialLinks"})
    Optional<Story> findWithDetailById(Long id);

    @EntityGraph(attributePaths = {"chapters", "socialLinks"})
    Optional<Story> findWithDetailBySlug(String slug);

    /** The website's feed: published only, newest first. */
    @EntityGraph(attributePaths = {"chapters", "socialLinks"})
    @Query("SELECT s FROM Story s WHERE s.published = TRUE ORDER BY s.sortOrder, s.createdAt DESC")
    List<Story> findPublished();

    /**
     * Admin listing. Null filters are disabled; the LIKE pattern is built by the service so a
     * blank search never reaches LOWER() as an untyped null.
     */
    @Query("""
            SELECT s FROM Story s
            WHERE (:search IS NULL OR LOWER(s.title) LIKE :search OR LOWER(s.content) LIKE :search)
              AND (:kind IS NULL OR s.kind = :kind)
              AND (:published IS NULL OR s.published = :published)
            """)
    Page<Story> search(@Param("search") String search,
                       @Param("kind") StoryKind kind,
                       @Param("published") Boolean published,
                       Pageable pageable);

    long countByPublishedTrue();

    long countByKind(StoryKind kind);
}
