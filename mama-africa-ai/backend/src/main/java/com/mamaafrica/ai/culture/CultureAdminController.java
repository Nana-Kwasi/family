package com.mamaafrica.ai.culture;

import com.mamaafrica.ai.culture.dto.DiasporaStoryResponse;
import com.mamaafrica.ai.culture.dto.ReviewResponse;
import com.mamaafrica.ai.culture.dto.StoryRequest;
import com.mamaafrica.ai.culture.dto.StoryResponse;
import com.mamaafrica.ai.culture.dto.StorySummary;
import com.mamaafrica.ai.culture.dto.SubscriberResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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

import java.util.Map;

/**
 * The Mama Africa Culture module. Replaces the /admin/stories screen that used to live on the
 * website itself. JWT required — these paths are outside the public list.
 */
@RestController
@RequestMapping("/api/culture/admin")
@Tag(name = "Culture (admin)")
public class CultureAdminController {

    private static final int MAX_PAGE_SIZE = 200;

    private final StoryService storyService;
    private final CommunityService community;
    private final StoryRepository stories;
    private final DiasporaStoryRepository diasporaStories;
    private final ReviewRepository reviews;

    public CultureAdminController(StoryService storyService,
                                  CommunityService community,
                                  StoryRepository stories,
                                  DiasporaStoryRepository diasporaStories,
                                  ReviewRepository reviews) {
        this.storyService = storyService;
        this.community = community;
        this.stories = stories;
        this.diasporaStories = diasporaStories;
        this.reviews = reviews;
    }

    // ── Stories ─────────────────────────────────────────────────────────────

    @GetMapping("/stories")
    @Operation(summary = "List stories and proverbs")
    public ResponseEntity<Page<StorySummary>> listStories(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) StoryKind kind,
            @RequestParam(required = false) Boolean published,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size) {
        var pageable = PageRequest.of(Math.max(page, 0), Math.clamp(size, 1, MAX_PAGE_SIZE),
                Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(storyService.list(search, kind, published, pageable));
    }

    @GetMapping("/stories/{id}")
    @Operation(summary = "Get one story with its chapters and links")
    public ResponseEntity<StoryResponse> getStory(@PathVariable Long id) {
        return ResponseEntity.ok(storyService.get(id));
    }

    @PostMapping("/stories")
    @Operation(summary = "Publish a story or proverb")
    public ResponseEntity<StoryResponse> createStory(@Valid @RequestBody StoryRequest request,
                                                     @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(storyService.create(request, actorName(actor)));
    }

    @PutMapping("/stories/{id}")
    @Operation(summary = "Edit a story")
    public ResponseEntity<StoryResponse> updateStory(@PathVariable Long id,
                                                     @Valid @RequestBody StoryRequest request,
                                                     @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(storyService.update(id, request, actorName(actor)));
    }

    @PutMapping("/stories/{id}/published")
    @Operation(summary = "Show or hide a story on the website")
    public ResponseEntity<StoryResponse> setStoryPublished(@PathVariable Long id,
                                                           @RequestParam boolean published,
                                                           @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(storyService.setPublished(id, published, actorName(actor)));
    }

    @DeleteMapping("/stories/{id}")
    @Operation(summary = "Delete a story")
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        storyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ── Visitor submissions ─────────────────────────────────────────────────

    @GetMapping("/diaspora-stories")
    @Operation(summary = "Diaspora stories submitted by visitors")
    public ResponseEntity<Page<DiasporaStoryResponse>> listDiasporaStories(
            @RequestParam(required = false) ModerationStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size) {
        var pageable = PageRequest.of(Math.max(page, 0), Math.clamp(size, 1, MAX_PAGE_SIZE),
                Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(community.listDiasporaStories(status, pageable));
    }

    @PutMapping("/diaspora-stories/{id}/status")
    @Operation(summary = "Approve or take down a submitted story")
    public ResponseEntity<DiasporaStoryResponse> moderateDiasporaStory(
            @PathVariable Long id,
            @RequestParam ModerationStatus status,
            @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(community.moderateDiasporaStory(id, status, actorName(actor)));
    }

    @DeleteMapping("/diaspora-stories/{id}")
    @Operation(summary = "Delete a submitted story")
    public ResponseEntity<Void> deleteDiasporaStory(@PathVariable Long id) {
        community.deleteDiasporaStory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/reviews")
    @Operation(summary = "Every rating left on the site")
    public ResponseEntity<Page<ReviewResponse>> listReviews(
            @RequestParam(required = false) ReviewSubject subject,
            @RequestParam(required = false) ModerationStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size) {
        var pageable = PageRequest.of(Math.max(page, 0), Math.clamp(size, 1, MAX_PAGE_SIZE),
                Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(community.listReviews(subject, status, pageable));
    }

    @PutMapping("/reviews/{id}/status")
    @Operation(summary = "Approve or hide a rating")
    public ResponseEntity<ReviewResponse> moderateReview(@PathVariable Long id,
                                                         @RequestParam ModerationStatus status,
                                                         @AuthenticationPrincipal UserDetails actor) {
        return ResponseEntity.ok(community.moderateReview(id, status, actorName(actor)));
    }

    @DeleteMapping("/reviews/{id}")
    @Operation(summary = "Delete a rating")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        community.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/subscribers")
    @Operation(summary = "Newsletter sign-ups")
    public ResponseEntity<Page<SubscriberResponse>> listSubscribers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok(community.listSubscribers(
                PageRequest.of(Math.max(page, 0), Math.clamp(size, 1, MAX_PAGE_SIZE))));
    }

    // ── Overview ────────────────────────────────────────────────────────────

    @GetMapping("/overview")
    @Operation(summary = "Counts for the Culture module's landing page")
    public ResponseEntity<Map<String, Long>> overview() {
        return ResponseEntity.ok(Map.of(
                "stories", stories.countByKind(StoryKind.STORY),
                "proverbs", stories.countByKind(StoryKind.PROVERB),
                "published", stories.countByPublishedTrue(),
                "diasporaTotal", diasporaStories.count(),
                "diasporaPending", diasporaStories.countByStatus(ModerationStatus.PENDING),
                "reviewsTotal", reviews.count(),
                "reviewsPending", reviews.countByStatus(ModerationStatus.PENDING)));
    }

    private static String actorName(UserDetails actor) {
        return actor == null ? null : actor.getUsername();
    }
}
