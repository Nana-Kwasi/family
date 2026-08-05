package com.mamaafrica.ai.conversation;

import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByConversationIdOrderByCreatedAtAsc(UUID conversationId);

    /** Newest first — reverse before sending to the model. */
    List<Message> findByConversationIdOrderByCreatedAtDesc(UUID conversationId, Limit limit);

    void deleteByConversationId(UUID conversationId);
}
