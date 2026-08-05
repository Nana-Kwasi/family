package com.mamaafrica.ai.support;

import com.mamaafrica.ai.support.dto.SupportMessageRequest;
import com.mamaafrica.ai.support.dto.SupportMessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The support form. Posting is open — a visitor with a problem should not have to sign in to
 * report it — but rate-limited server-side, which is the whole point of moving it here.
 */
@RestController
@RequestMapping("/api/support")
@Tag(name = "Support")
public class SupportController {

    private final SupportService support;

    public SupportController(SupportService support) {
        this.support = support;
    }

    @PostMapping("/messages")
    @Operation(summary = "Send a support question")
    public ResponseEntity<SupportMessageResponse> submit(@Valid @RequestBody SupportMessageRequest request,
                                                         HttpServletRequest http) {
        return ResponseEntity.status(HttpStatus.CREATED).body(support.submit(request, http));
    }

    // ── Admin inbox ─────────────────────────────────────────────────────────

    @GetMapping("/admin/messages")
    @Operation(summary = "Read the support inbox")
    public ResponseEntity<Page<SupportMessageResponse>> list(
            @RequestParam(required = false) SupportStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size) {
        var pageable = PageRequest.of(Math.max(page, 0), Math.clamp(size, 1, 200),
                Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(support.list(status, pageable));
    }

    @PutMapping("/admin/messages/{id}/status")
    @Operation(summary = "Mark a message handled, or as spam")
    public ResponseEntity<SupportMessageResponse> resolve(@PathVariable Long id,
                                                          @RequestParam SupportStatus status,
                                                          @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(support.resolve(id, status, actor == null ? null : actor.getUsername()));
    }

    @DeleteMapping("/admin/messages/{id}")
    @Operation(summary = "Delete a message")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        support.delete(id);
        return ResponseEntity.noContent().build();
    }
}
