package com.mamaafrica.ai.knowledge;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KnowledgeCategoryRepository extends JpaRepository<KnowledgeCategory, Long> {

    Optional<KnowledgeCategory> findBySlug(String slug);

    boolean existsBySlug(String slug);

    List<KnowledgeCategory> findAllByOrderByNameAsc();
}
