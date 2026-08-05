package com.mamaafrica.ai.conversation;

import com.mamaafrica.ai.conversation.dto.ConversationDetail;
import com.mamaafrica.ai.conversation.dto.ConversationSummary;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/** Admin-only. The public website never touches these endpoints. */
@RestController
@RequestMapping("/api/conversations")
@Tag(name = "Conversations")
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @GetMapping
    @Operation(summary = "List and search conversations")
    public ResponseEntity<Page<ConversationSummary>> list(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20, sort = "updatedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(conversationService.search(query, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Full transcript of a conversation")
    public ResponseEntity<ConversationDetail> get(@PathVariable UUID id) {
        return ResponseEntity.ok(conversationService.detail(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a conversation and its messages")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        conversationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
