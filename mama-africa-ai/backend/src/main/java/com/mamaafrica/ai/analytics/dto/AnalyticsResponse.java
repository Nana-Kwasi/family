package com.mamaafrica.ai.analytics.dto;

import java.time.LocalDate;
import java.util.List;

public record AnalyticsResponse(
        int days,
        LocalDate from,
        LocalDate to,
        Totals totals,
        Latency latency,
        List<DailyPoint> activity,
        List<Slice> languages,
        List<Slice> documentsByStatus,
        List<Slice> documentsByCategory,
        List<Slice> models
) {

    public record Totals(long conversations, long messages, double messagesPerConversation) {
    }

    /** All values in milliseconds; zero when nothing was recorded in the window. */
    public record Latency(long averageMs, long p50Ms, long p95Ms, long slowestMs, long sampleCount) {
    }

    public record DailyPoint(LocalDate date, long conversations, long messages) {
    }

    public record Slice(String label, long count) {
    }
}
