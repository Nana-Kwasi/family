package com.mamaafrica.ai.policy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    Optional<Policy> findByKind(PolicyKind kind);

    @Query("SELECT p FROM Policy p ORDER BY p.sortOrder, p.id")
    List<Policy> findAllOrdered();

    /** What the website may show. A draft is never exposed. */
    @Query("SELECT p FROM Policy p WHERE p.published = TRUE ORDER BY p.sortOrder, p.id")
    List<Policy> findPublished();

    /** The ones a new account must tick. */
    @Query("SELECT p FROM Policy p WHERE p.published = TRUE AND p.requiredAtSignup = TRUE ORDER BY p.sortOrder, p.id")
    List<Policy> findRequiredAtSignup();
}
