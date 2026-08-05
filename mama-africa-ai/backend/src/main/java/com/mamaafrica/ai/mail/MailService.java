package com.mamaafrica.ai.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Outbound email.
 *
 * <p>Optional on purpose. With no SMTP host configured the application still starts and every
 * send becomes a logged no-op, so local development and a first deployment do not require mail
 * credentials. What must never happen is a failed send breaking the request that triggered it:
 * a visitor's support message is saved whether or not the notification leaves the building.
 */
@Service
public class MailService {

    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    private final ObjectProvider<JavaMailSender> senders;
    private final String from;
    private final String supportInbox;
    private final boolean enabled;

    public MailService(ObjectProvider<JavaMailSender> senders,
                       @Value("${spring.mail.host:}") String host,
                       @Value("${app.mail.from:}") String from,
                       @Value("${app.mail.support-inbox:}") String supportInbox) {
        this.senders = senders;
        this.from = from;
        this.supportInbox = supportInbox;
        this.enabled = host != null && !host.isBlank() && from != null && !from.isBlank();
        if (!enabled) {
            log.info("Email is not configured (spring.mail.host / app.mail.from) — sends will be skipped");
        }
    }

    public boolean isEnabled() {
        return enabled;
    }

    /** Where support notifications go. Blank means nobody is notified. */
    public String supportInbox() {
        return supportInbox;
    }

    /**
     * Sends in the background. The caller's transaction has usually already committed what
     * matters; waiting on an SMTP handshake would only make the visitor's request slower.
     */
    @Async
    public void send(String to, String subject, String body) {
        if (!enabled || to == null || to.isBlank()) {
            log.debug("Skipping email '{}' — mail disabled or no recipient", subject);
            return;
        }

        var sender = senders.getIfAvailable();
        if (sender == null) {
            log.warn("Mail is configured but no JavaMailSender is available — skipping '{}'", subject);
            return;
        }

        try {
            var message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            sender.send(message);
            log.info("Sent email '{}'", subject);
        } catch (RuntimeException e) {
            // Logged, never rethrown: see the class comment.
            log.error("Could not send email '{}': {}", subject, e.getMessage());
        }
    }
}
