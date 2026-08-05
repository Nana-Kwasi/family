package com.mamaafrica.ai.conversation;

import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.conversation.dto.ConversationDetail;
import com.mamaafrica.ai.conversation.dto.ConversationSummary;
import com.mamaafrica.ai.language.Language;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class ConversationService {

    /** How many previous turns are replayed to the model. */
    private static final int HISTORY_LIMIT = 10;

    private final ConversationRepository conversations;
    private final MessageRepository messages;

    public ConversationService(ConversationRepository conversations, MessageRepository messages) {
        this.conversations = conversations;
        this.messages = messages;
    }

    /**
     * Continues the referenced conversation, or starts a new one when the id is absent or unknown.
     *
     * <p>A new conversation is returned unsaved — it is persisted by {@link #recordExchange} once the
     * model has actually answered, so a failed request leaves no empty conversation behind.
     */
    public Conversation findOrCreate(UUID conversationId, Language language, String firstMessage) {
        if (conversationId != null) {
            var existing = conversations.findById(conversationId);
            if (existing.isPresent()) {
                return existing.get();
            }
        }
        return new Conversation(language, firstMessage);
    }

    /** Recent turns, oldest first. */
    public List<Message> recentHistory(UUID conversationId) {
        var newestFirst = new ArrayList<>(
                messages.findByConversationIdOrderByCreatedAtDesc(conversationId, Limit.of(HISTORY_LIMIT)));
        return newestFirst.reversed();
    }

    @Transactional
    public void recordExchange(Conversation conversation, Message userMessage, Message assistantMessage,
                               String model, String provider) {
        // The conversation must exist before its messages — messages.conversation_id is a foreign key.
        conversation.touch(model, provider);
        conversations.save(conversation);
        messages.save(userMessage);
        messages.save(assistantMessage);
    }

    // --- Admin console queries ---

    public Page<ConversationSummary> search(String query, Pageable pageable) {
        var page = (query == null || query.isBlank())
                ? conversations.findAll(pageable)
                : conversations.findByTitleContainingIgnoreCase(query.trim(), pageable);
        return page.map(ConversationSummary::from);
    }

    public ConversationDetail detail(UUID id) {
        var conversation = conversations.findById(id)
                .orElseThrow(() -> new NotFoundException("Conversation not found: " + id));
        return ConversationDetail.of(conversation, messages.findByConversationIdOrderByCreatedAtAsc(id));
    }

    public List<ConversationSummary> recent() {
        return conversations.findTop5ByOrderByUpdatedAtDesc().stream()
                .map(ConversationSummary::from)
                .toList();
    }

    public long count() {
        return conversations.count();
    }

    @Transactional
    public void delete(UUID id) {
        if (!conversations.existsById(id)) {
            throw new NotFoundException("Conversation not found: " + id);
        }
        messages.deleteByConversationId(id);
        conversations.deleteById(id);
    }
}
