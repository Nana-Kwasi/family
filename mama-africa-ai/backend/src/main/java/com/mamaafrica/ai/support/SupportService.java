package com.mamaafrica.ai.support;

import com.mamaafrica.ai.common.ClientFingerprint;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.common.TooManyRequestsException;
import com.mamaafrica.ai.config.AppProperties;
import com.mamaafrica.ai.mail.MailService;
import com.mamaafrica.ai.support.dto.SupportMessageRequest;
import com.mamaafrica.ai.support.dto.SupportMessageResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.Locale;

@Service
public class SupportService {

    private static final Logger log = LoggerFactory.getLogger(SupportService.class);

    /**
     * One message a minute, and no more than five an hour, from the same sender.
     *
     * <p>The minute stops the repeat-submit floods that prompted this work; the hour stops
     * someone patiently sending one a minute all day. Both are checked against the messages
     * table rather than an in-memory counter, so they hold across restarts and cannot be
     * cleared by the visitor.
     */
    private static final Duration BURST_WINDOW = Duration.ofMinutes(1);
    private static final int BURST_LIMIT = 1;
    private static final Duration SUSTAINED_WINDOW = Duration.ofHours(1);
    private static final int SUSTAINED_LIMIT = 5;

    private final SupportMessageRepository messages;
    private final MailService mail;
    private final String salt;

    public SupportService(SupportMessageRepository messages, MailService mail, AppProperties props) {
        this.messages = messages;
        this.mail = mail;
        this.salt = props.security().jwt().secret();
    }

    @Transactional
    public SupportMessageResponse submit(SupportMessageRequest request, HttpServletRequest http) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        String clientHash = ClientFingerprint.of(http, salt);

        enforceLimit(email, clientHash);

        var message = new SupportMessage(
                blankToNull(request.name()),
                email,
                request.message().trim(),
                clientHash);

        var saved = messages.save(message);

        // Sent in the background and never allowed to fail the request: the message is already
        // saved, and the console inbox is the record. Email is a notification, not the store.
        if (mail.isEnabled()) {
            mail.send(mail.supportInbox(),
                    "New support question - Mama Africa",
                    "From: " + (saved.getName() == null ? "(no name)" : saved.getName())
                            + "\nReply to: " + saved.getEmail()
                            + "\n\n" + saved.getMessage());
            saved.markEmailed();
        }

        log.info("Support message #{} received", saved.getId());
        return SupportMessageResponse.from(saved);
    }

    /**
     * Checked twice: once for the address given, once for the caller. Limiting by address
     * alone is trivially defeated by typing a different one on each send.
     */
    private void enforceLimit(String email, String clientHash) {
        var now = Instant.now();

        if (messages.countByEmailSince(email, now.minus(BURST_WINDOW)) >= BURST_LIMIT
                || messages.countByClientSince(clientHash, now.minus(BURST_WINDOW)) >= BURST_LIMIT) {
            throw new TooManyRequestsException(
                    "You have just sent a message. Please wait a minute before sending another.",
                    BURST_WINDOW.toSeconds());
        }

        if (messages.countByEmailSince(email, now.minus(SUSTAINED_WINDOW)) >= SUSTAINED_LIMIT
                || messages.countByClientSince(clientHash, now.minus(SUSTAINED_WINDOW)) >= SUSTAINED_LIMIT) {
            throw new TooManyRequestsException(
                    "You have sent several messages recently. Please wait a while, or email "
                            + "Mamaafricaafia@gmail.com directly if it is urgent.",
                    SUSTAINED_WINDOW.toSeconds());
        }
    }

    @Transactional(readOnly = true)
    public Page<SupportMessageResponse> list(SupportStatus status, Pageable pageable) {
        return messages.search(status, pageable).map(SupportMessageResponse::from);
    }

    @Transactional
    public SupportMessageResponse resolve(Long id, SupportStatus status, String actor) {
        var message = messages.findById(id)
                .orElseThrow(() -> new NotFoundException("Support message " + id + " not found"));
        message.resolve(status, actor);
        return SupportMessageResponse.from(messages.save(message));
    }

    @Transactional
    public void delete(Long id) {
        if (!messages.existsById(id)) {
            throw new NotFoundException("Support message " + id + " not found");
        }
        messages.deleteById(id);
    }

    public long countNew() {
        return messages.countByStatus(SupportStatus.NEW);
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }
}
