package com.mamaafrica.ai.market;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySlug(String slug);

    Optional<Product> findByLegacyId(Integer legacyId);

    boolean existsBySlug(String slug);

    /**
     * Admin listing. The filters are all optional; a null parameter disables its clause.
     *
     * <p>{@code LOWER(:search)} is computed once outside the LIKE so a null search does not
     * reach LOWER() — PostgreSQL rejects an untyped null there even though H2 accepts it.
     */
    @Query("""
            SELECT p FROM Product p
            WHERE (:search IS NULL OR LOWER(p.name) LIKE :search OR LOWER(p.slug) LIKE :search)
              AND (:bornDay IS NULL OR p.bornDay = :bornDay)
              AND (:productType IS NULL OR p.productType = :productType)
              AND (:active IS NULL OR p.active = :active)
            """)
    Page<Product> search(@Param("search") String search,
                         @Param("bornDay") String bornDay,
                         @Param("productType") String productType,
                         @Param("active") Boolean active,
                         Pageable pageable);

    /** Storefront read. The graph is fetched eagerly so one call renders a whole page. */
    @EntityGraph(attributePaths = {"images", "sizes", "details", "perfectFor", "sizeChart"})
    @Query("SELECT p FROM Product p WHERE p.active = TRUE ORDER BY p.sortOrder, p.id")
    List<Product> findAllForStorefront();

    @EntityGraph(attributePaths = {"images", "sizes", "details", "perfectFor", "sizeChart"})
    Optional<Product> findWithDetailBySlug(String slug);

    @EntityGraph(attributePaths = {"images", "sizes", "details", "perfectFor", "sizeChart"})
    Optional<Product> findWithDetailByLegacyId(Integer legacyId);

    @EntityGraph(attributePaths = {"images", "sizes", "details", "perfectFor", "sizeChart"})
    Optional<Product> findWithDetailById(Long id);

    long countByActiveTrue();

    long countBySoldOutTrue();

    @Query("SELECT COALESCE(MAX(p.sortOrder), 0) FROM Product p")
    int maxSortOrder();

    @Query("SELECT DISTINCT p.productType FROM Product p WHERE p.active = TRUE ORDER BY p.productType")
    List<String> distinctActiveTypes();
}
