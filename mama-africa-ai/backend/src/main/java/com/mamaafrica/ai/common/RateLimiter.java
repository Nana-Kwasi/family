package com.mamaafrica.ai.common;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * A sliding-window limiter for the endpoints anonymous visitors can post to.
 *
 * <p>In memory, which means two things worth stating plainly: the counters reset when the
 * application restarts, and they are per-instance rather than shared across a cluster. That is
 * adequate for the traffic this site sees and for the abuse it is actually experiencing. The
 * support form does not rely on this at all — its limit is a query over the messages table, so
 * it survives both restarts and a second instance.
 */
@Component
public class RateLimiter {

    /** Bucket keys are "<action>:<caller hash>"; the deque holds the times of recent hits. */
    private final Map<String, Deque<Instant>> hits = new ConcurrentHashMap<>();

    /**
     * Records a hit and throws when the caller has exceeded {@code limit} within {@code window}.
     *
     * @param key    identifies the caller and the action being limited
     * @param limit  how many are allowed inside the window
     * @param window how far back to look
     */
    /** Forgets a caller's history — called after a successful sign-in. */
    public void clear(String key) {
        hits.remove(key);
    }

    public void check(String key, int limit, Duration window) {
        checkOnly(key, limit, window);
        record(key);
    }

    /**
     * Throws if the caller is already over the limit, without counting this call.
     *
     * <p>Used for sign-in, where only failures should count. Counting every attempt means a
     * legitimate admin who signs in successfully a few times is locked out alongside the
     * attacker they share an address with.
     */
    public void checkOnly(String key, int limit, Duration window) {
        var now = Instant.now();
        var cutoff = now.minus(window);

        var bucket = hits.get(key);
        if (bucket == null) {
            return;
        }
        synchronized (bucket) {
            while (!bucket.isEmpty() && bucket.peekFirst().isBefore(cutoff)) {
                bucket.pollFirst();
            }
            if (bucket.size() >= limit) {
                var oldest = bucket.peekFirst();
                long retryAfter = Math.max(1, Duration.between(now, oldest.plus(window)).toSeconds());
                throw new TooManyRequestsException(
                        "Too many attempts. Please wait a moment and try again.", retryAfter);
            }
        }
    }

    /** Counts one hit against the key. */
    public void record(String key) {
        var now = Instant.now();
        var bucket = hits.computeIfAbsent(key, k -> new ArrayDeque<>());
        synchronized (bucket) {
            bucket.addLast(now);
        }

        // Buckets for callers who never return would otherwise accumulate for the lifetime of
        // the process. Cheap opportunistic sweep rather than a scheduled task.
        if (hits.size() > 10_000) {
            hits.entrySet().removeIf(entry -> {
                synchronized (entry.getValue()) {
                    return entry.getValue().isEmpty()
                            || entry.getValue().peekLast().isBefore(now.minus(Duration.ofHours(1)));
                }
            });
        }
    }
}
