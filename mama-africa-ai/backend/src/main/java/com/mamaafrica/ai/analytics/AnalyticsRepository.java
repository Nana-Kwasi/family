package com.mamaafrica.ai.analytics;

import com.mamaafrica.ai.conversation.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

/**
 * Read-only aggregate queries for the analytics page.
 *
 * <p>{@code CAST(x AS LocalDate)} is used rather than a database-specific date function so the
 * same HQL runs on PostgreSQL and on H2 in the tests.
 */
public interface AnalyticsRepository extends JpaRepository<Message, Long> {

    @Query("""
            SELECT CAST(m.createdAt AS LocalDate) AS day, COUNT(m)
            FROM Message m
            WHERE m.createdAt >= :from
            GROUP BY CAST(m.createdAt AS LocalDate)
            ORDER BY CAST(m.createdAt AS LocalDate)
            """)
    List<Object[]> messagesPerDay(@Param("from") Instant from);

    @Query("""
            SELECT CAST(c.createdAt AS LocalDate) AS day, COUNT(c)
            FROM Conversation c
            WHERE c.createdAt >= :from
            GROUP BY CAST(c.createdAt AS LocalDate)
            ORDER BY CAST(c.createdAt AS LocalDate)
            """)
    List<Object[]> conversationsPerDay(@Param("from") Instant from);

    @Query("""
            SELECT c.language, COUNT(c)
            FROM Conversation c
            WHERE c.createdAt >= :from
            GROUP BY c.language
            ORDER BY COUNT(c) DESC
            """)
    List<Object[]> conversationsByLanguage(@Param("from") Instant from);

    @Query("""
            SELECT d.status, COUNT(d)
            FROM KnowledgeDocument d
            GROUP BY d.status
            """)
    List<Object[]> documentsByStatus();

    @Query("""
            SELECT COALESCE(d.category.name, 'Uncategorised'), COUNT(d)
            FROM KnowledgeDocument d
            GROUP BY d.category.name
            ORDER BY COUNT(d) DESC
            """)
    List<Object[]> documentsByCategory();

    /**
     * Raw latencies for the window. Percentiles are computed in Java — the SQL syntax for them
     * differs between databases, and the volume here is bounded by the reporting window.
     */
    @Query("""
            SELECT m.latencyMs
            FROM Message m
            WHERE m.role = com.mamaafrica.ai.conversation.MessageRole.ASSISTANT
              AND m.latencyMs IS NOT NULL
              AND m.createdAt >= :from
            """)
    List<Long> latencies(@Param("from") Instant from);

    @Query("""
            SELECT m.model, COUNT(m)
            FROM Message m
            WHERE m.model IS NOT NULL AND m.createdAt >= :from
            GROUP BY m.model
            ORDER BY COUNT(m) DESC
            """)
    List<Object[]> messagesByModel(@Param("from") Instant from);

    static LocalDate dayOf(Object value) {
        return (LocalDate) value;
    }
}
