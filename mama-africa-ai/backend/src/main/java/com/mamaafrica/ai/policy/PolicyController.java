package com.mamaafrica.ai.policy;

import com.mamaafrica.ai.policy.dto.PolicyRequest;
import com.mamaafrica.ai.policy.dto.PolicyResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Policies. The public reads are open — a visitor has to be able to read what they are being
 * asked to agree to before they have an account. Drafting and publishing need an admin.
 *
 * <p>No caching beyond revalidation: an admin publishes a correction because the old wording
 * was wrong, and a stale copy in someone's browser is exactly the thing that must not happen.
 */
@RestController
@RequestMapping("/api/policies")
@Tag(name = "Policies")
public class PolicyController {

    private final PolicyService policies;

    public PolicyController(PolicyService policies) {
        this.policies = policies;
    }

    @GetMapping
    @Operation(summary = "Published policies")
    public ResponseEntity<List<PolicyResponse>> published() {
        return ResponseEntity.ok().cacheControl(CacheControl.noCache()).body(policies.listPublished());
    }

    @GetMapping("/signup")
    @Operation(summary = "Policies a new account must accept")
    public ResponseEntity<List<PolicyResponse>> requiredAtSignup() {
        return ResponseEntity.ok().cacheControl(CacheControl.noCache()).body(policies.listRequiredAtSignup());
    }

    @GetMapping("/{kind}")
    @Operation(summary = "One published policy")
    public ResponseEntity<PolicyResponse> one(@PathVariable PolicyKind kind) {
        return ResponseEntity.ok().cacheControl(CacheControl.noCache()).body(policies.getPublished(kind));
    }

    // ── Admin ───────────────────────────────────────────────────────────────

    @GetMapping("/admin")
    @Operation(summary = "Every policy, drafts included")
    public ResponseEntity<List<PolicyResponse>> all() {
        return ResponseEntity.ok(policies.listAll());
    }

    @PutMapping("/admin/{id}")
    @Operation(summary = "Edit a policy — does not publish it")
    public ResponseEntity<PolicyResponse> update(@PathVariable Long id,
                                                 @Valid @RequestBody PolicyRequest request,
                                                 @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(policies.update(id, request, actorName(actor)));
    }

    @PutMapping("/admin/{id}/publish")
    @Operation(summary = "Publish the current text and mint a new version")
    public ResponseEntity<PolicyResponse> publish(@PathVariable Long id,
                                                  @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(policies.publish(id, actorName(actor)));
    }

    @PutMapping("/admin/{id}/unpublish")
    @Operation(summary = "Take a policy off the website")
    public ResponseEntity<PolicyResponse> unpublish(@PathVariable Long id,
                                                    @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(policies.unpublish(id, actorName(actor)));
    }

    private static String actorName(UserDetails actor) {
        return actor == null ? null : actor.getUsername();
    }
}
