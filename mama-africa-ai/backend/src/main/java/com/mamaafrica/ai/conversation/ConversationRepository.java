package com.mamaafrica.ai.conversation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {

    Page<Conversation> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    List<Conversation> findTop5ByOrderByUpdatedAtDesc();
}
