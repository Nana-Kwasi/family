package com.mamaafrica.ai.knowledge;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface KnowledgeDocumentRepository extends JpaRepository<KnowledgeDocument, UUID> {

    /** Used by the site-guide seeder to avoid re-seeding a document that already exists. */
    boolean existsByFileName(String fileName);

    java.util.Optional<KnowledgeDocument> findFirstByFileName(String fileName);

    /**
     * {@code query} must never be null — an empty string means "match everything".
     * PostgreSQL cannot resolve {@code lower(?)} when the driver binds an untyped null,
     * so the null case is handled by the caller rather than in SQL.
     */
    @Query("""
            SELECT d FROM KnowledgeDocument d
            WHERE (LOWER(d.title) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(d.fileName) LIKE LOWER(CONCAT('%', :query, '%')))
              AND (:categoryId IS NULL OR d.category.id = :categoryId)
            """)
    Page<KnowledgeDocument> search(@Param("query") String query,
                                   @Param("categoryId") Long categoryId,
                                   Pageable pageable);

    List<KnowledgeDocument> findAllByOrderByCreatedAtAsc();

    long countByStatus(DocumentStatus status);
}
