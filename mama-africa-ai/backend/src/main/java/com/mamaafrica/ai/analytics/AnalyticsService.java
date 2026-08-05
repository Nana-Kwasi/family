package com.mamaafrica.ai.analytics;

import com.mamaafrica.ai.analytics.dto.AnalyticsResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class AnalyticsService {

    private final AnalyticsRepository repository;

    public AnalyticsService(AnalyticsRepository repository) {
        this.repository = repository;
    }

    public AnalyticsResponse forWindow(int days) {
        var to = LocalDate.now(ZoneOffset.UTC);
        var from = to.minusDays(days - 1L);
        var fromInstant = from.atStartOfDay(ZoneOffset.UTC).toInstant();

        var activity = buildActivity(from, to, fromInstant);
        var conversations = activity.stream().mapToLong(AnalyticsResponse.DailyPoint::conversations).sum();
        var messages = activity.stream().mapToLong(AnalyticsResponse.DailyPoint::messages).sum();

        return new AnalyticsResponse(
                days,
                from,
                to,
                new AnalyticsResponse.Totals(conversations, messages,
                        conversations == 0 ? 0 : round1((double) messages / conversations)),
                latency(fromInstant),
                activity,
                slices(repository.conversationsByLanguage(fromInstant)),
                slices(repository.documentsByStatus()),
                slices(repository.documentsByCategory()),
                slices(repository.messagesByModel(fromInstant)));
    }

    /** Every day in the window appears, including quiet ones — gaps would distort the chart. */
    private List<AnalyticsResponse.DailyPoint> buildActivity(LocalDate from, LocalDate to, Instant fromInstant) {
        var conversationCounts = toDayMap(repository.conversationsPerDay(fromInstant));
        var messageCounts = toDayMap(repository.messagesPerDay(fromInstant));

        var points = new ArrayList<AnalyticsResponse.DailyPoint>();
        for (var day = from; !day.isAfter(to); day = day.plusDays(1)) {
            points.add(new AnalyticsResponse.DailyPoint(
                    day,
                    conversationCounts.getOrDefault(day, 0L),
                    messageCounts.getOrDefault(day, 0L)));
        }
        return points;
    }

    private AnalyticsResponse.Latency latency(Instant from) {
        var samples = new ArrayList<>(repository.latencies(from));
        if (samples.isEmpty()) {
            return new AnalyticsResponse.Latency(0, 0, 0, 0, 0);
        }
        samples.sort(null);

        var average = Math.round(samples.stream().mapToLong(Long::longValue).average().orElse(0));
        return new AnalyticsResponse.Latency(
                average,
                percentile(samples, 0.50),
                percentile(samples, 0.95),
                samples.getLast(),
                samples.size());
    }

    /** Nearest-rank percentile over an ascending list. */
    private static long percentile(List<Long> ascending, double fraction) {
        var rank = (int) Math.ceil(fraction * ascending.size());
        return ascending.get(Math.clamp(rank - 1, 0, ascending.size() - 1));
    }

    private static Map<LocalDate, Long> toDayMap(List<Object[]> rows) {
        var map = new LinkedHashMap<LocalDate, Long>();
        for (var row : rows) {
            map.put((LocalDate) row[0], ((Number) row[1]).longValue());
        }
        return map;
    }

    private static List<AnalyticsResponse.Slice> slices(List<Object[]> rows) {
        return rows.stream()
                .map(row -> new AnalyticsResponse.Slice(
                        row[0] == null ? "Uncategorised" : String.valueOf(row[0]),
                        ((Number) row[1]).longValue()))
                .toList();
    }

    private static double round1(double value) {
        return Math.round(value * 10) / 10.0;
    }
}
