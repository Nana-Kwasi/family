package com.mamaafrica.ai.chat;

import com.mamaafrica.ai.chat.dto.ChatRequest;
import com.mamaafrica.ai.common.ClientFingerprint;
import com.mamaafrica.ai.common.RateLimiter;
import com.mamaafrica.ai.common.TooManyRequestsException;
import org.springframework.beans.factory.annotation.Value;
import com.mamaafrica.ai.config.AppProperties;
import com.mamaafrica.ai.security.CustomerPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.servlet.http.HttpServletRequest;
import com.mamaafrica.ai.chat.dto.ChatResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;

/**
 * The only API the Mama Africa website calls. The website never talks to Ollama or RunPod directly.
 */
@RestController
@RequestMapping("/api/chat")
@Tag(name = "Chat")
public class ChatController {

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);
    private static final long STREAM_TIMEOUT_MS = 300_000L;

    /**
     * Chat is the one public endpoint that costs real money per call — inference is billed per
     * token — so an open loop against it spends the site's budget.
     *
     * <p>Two tiers rather than one. A first-time visitor on the culture page has never signed
     * in and should still meet Afia, so anonymous callers get a small allowance. A signed-in
     * visitor gets a generous one, counted against their <em>account</em> rather than their
     * address: an IP is shared in an office and changed with a VPN, so it is both unfair and
     * weak as an identity. An account is neither, and abuse traces to someone you can disable.
     */
    private static final Duration WINDOW = Duration.ofHours(1);
    private static final int SIGNED_IN_LIMIT = 60;

    /**
     * A ceiling across everyone, not per caller — the only limit that actually bounds the bill.
     *
     * <p>Per-caller limits assume the caller can be identified. Someone determined can rotate
     * addresses and defeat that, and no amount of hiding the endpoint helps: the URL and the
     * key are both visible to anyone who opens developer tools, because the browser has to
     * send them. This cap does not care who is calling. It is the difference between a bad day
     * costing a few pounds and costing whatever the card allows.
     *
     * <p>Set CHAT_DAILY_CAP to suit real traffic; it should sit comfortably above a normal
     * day so it only ever trips on something abnormal.
     */
    private static final Duration DAY = Duration.ofHours(24);

    private final ChatService chatService;
    private final RateLimiter rateLimiter;
    private final String salt;
    private final int dailyCap;

    public ChatController(ChatService chatService, RateLimiter rateLimiter, AppProperties props,
                          @Value("${chat.daily-cap:2000}") int dailyCap) {
        this.chatService = chatService;
        this.rateLimiter = rateLimiter;
        this.salt = props.security().jwt().secret();
        this.dailyCap = dailyCap;
    }

    private void limit(HttpServletRequest http) {
        // Checked first: if the whole site has spent its day, no individual allowance matters.
        try {
            rateLimiter.check("chat-global", dailyCap, DAY);
        } catch (TooManyRequestsException e) {
            log.error("Daily chat cap of {} reached — refusing further calls. Either traffic has "
                    + "grown and the cap needs raising, or something is abusing the endpoint.", dailyCap);
            throw new TooManyRequestsException(
                    "Afia is resting for today. Please try again tomorrow, or write to "
                    + "Mamaafricaafia@gmail.com if you need help now.", e.getRetryAfterSeconds());
        }

        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomerPrincipal customer) {
            // Per account, not per address: an IP is shared in an office and changed with a
            // VPN, so it is both unfair to real visitors and weak as identity.
            rateLimiter.check("chat-account:" + customer.id(), SIGNED_IN_LIMIT, WINDOW);
            return;
        }
        // The filter chain requires ROLE_CUSTOMER, so this is unreachable in practice. Failing
        // closed rather than open means a future config slip cannot quietly open the endpoint.
        throw new TooManyRequestsException("Please sign in to talk with Afia.", 0);
    }

    @PostMapping
    @Operation(summary = "Ask Mama Africa AI a question")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request,
                                             HttpServletRequest http) {
        limit(http);
        return ResponseEntity.ok(chatService.chat(request));
    }

    @PostMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @Operation(summary = "Same as /api/chat but streams tokens over server-sent events")
    public SseEmitter stream(@Valid @RequestBody ChatRequest request, HttpServletRequest http) {
        // Streaming costs the same tokens as the blocking call, so it is limited identically.
        limit(http);
        var emitter = new SseEmitter(STREAM_TIMEOUT_MS);

        chatService.chatStream(request,
                // Wrapped in an object so Jackson escapes newlines — a raw newline inside a
                // token would otherwise terminate the SSE frame early and corrupt the stream.
                token -> send(emitter, "token", Map.of("t", token)),
                response -> {
                    send(emitter, "done", response);
                    emitter.complete();
                },
                error -> emitter.completeWithError(error));

        return emitter;
    }

    private void send(SseEmitter emitter, String eventName, Object data) {
        try {
            emitter.send(SseEmitter.event().name(eventName).data(data));
        } catch (IOException | IllegalStateException e) {
            log.debug("SSE client disconnected before '{}' event", eventName);
        }
    }
}
