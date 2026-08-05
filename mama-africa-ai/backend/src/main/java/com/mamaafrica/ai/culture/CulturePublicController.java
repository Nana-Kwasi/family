package com.mamaafrica.ai.culture;

import com.mamaafrica.ai.culture.dto.DiasporaStoryRequest;
import com.mamaafrica.ai.culture.dto.DiasporaStoryResponse;
import com.mamaafrica.ai.culture.dto.ReviewRequest;
import com.mamaafrica.ai.culture.dto.ReviewResponse;
import com.mamaafrica.ai.culture.dto.StoryResponse;
import com.mamaafrica.ai.culture.dto.SubscriberRequest;
import com.mamaafrica.ai.common.ClientFingerprint;
import com.mamaafrica.ai.common.RateLimiter;
import com.mamaafrica.ai.config.AppProperties;
import jakarta.servlet.http.HttpServletRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.List;
import java.util.Map;

/**
 * What the website calls for cultural content. Reads are open — the Stories and Diaspora pages
 * render to anonymous visitors. The writes here are the ones the site has always allowed a
 * visitor to make: submitting a diaspora story, leaving a rating, joining the newsletter.
 *
 * <p>These write endpoints are unauthenticated by design, which makes them the site's abuse
 * surface, so each one is rate-limited per caller. The limits are deliberately loose enough
 * that no genuine visitor will meet them and tight enough that a script gets nowhere.
 */
@RestController
@RequestMapping("/api/culture")
@Tag(name = "Culture (public)")
public class CulturePublicController {

    private static final Duration WINDOW = Duration.ofHours(1);
    private static final int STORY_LIMIT = 3;
    private static final int REVIEW_LIMIT = 10;
    private static final int SUBSCRIBE_LIMIT = 5;
    private static final int BOOK_READ_LIMIT = 60;

    private final StoryService storyService;
    private final CommunityService community;
    private final RateLimiter rateLimiter;
    private final String salt;

    public CulturePublicController(StoryService storyService, CommunityService community,
                                   RateLimiter rateLimiter, AppProperties props) {
        this.storyService = storyService;
        this.community = community;
        this.rateLimiter = rateLimiter;
        this.salt = props.security().jwt().secret();
    }

    private void limit(String action, int max, HttpServletRequest http) {
        rateLimiter.check(action + ':' + ClientFingerprint.of(http, salt), max, WINDOW);
    }

    @GetMapping("/stories")
    @Operation(summary = "Published stories and proverbs, newest first")
    public ResponseEntity<List<StoryResponse>> stories() {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noCache())
                .body(storyService.published());
    }

    @GetMapping("/stories/{slug}")
    @Operation(summary = "One published story")
    public ResponseEntity<StoryResponse> story(@PathVariable String slug) {
        return ResponseEntity.ok(storyService.getPublished(slug));
    }

    @GetMapping("/diaspora-stories")
    @Operation(summary = "Diaspora stories shared by visitors")
    public ResponseEntity<List<DiasporaStoryResponse>> diasporaStories() {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noCache())
                .body(community.publicDiasporaStories());
    }

    @PostMapping("/diaspora-stories")
    @Operation(summary = "Share a diaspora story")
    public ResponseEntity<DiasporaStoryResponse> submitDiasporaStory(
            @Valid @RequestBody DiasporaStoryRequest request, HttpServletRequest http) {
        limit("diaspora", STORY_LIMIT, http);
        return ResponseEntity.status(HttpStatus.CREATED).body(community.submitDiasporaStory(request));
    }

    @GetMapping("/reviews")
    @Operation(summary = "Approved reviews for a story, the e-book, or a diaspora story")
    public ResponseEntity<List<ReviewResponse>> reviews(@RequestParam ReviewSubject subject,
                                                        @RequestParam(required = false) Long subjectId) {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noCache())
                .body(community.publicReviews(subject, subjectId));
    }

    @PostMapping("/reviews")
    @Operation(summary = "Leave a rating")
    public ResponseEntity<ReviewResponse> submitReview(@Valid @RequestBody ReviewRequest request,
                                                       HttpServletRequest http) {
        limit("review", REVIEW_LIMIT, http);
        return ResponseEntity.status(HttpStatus.CREATED).body(community.submitReview(request));
    }

    @PostMapping("/subscribers")
    @Operation(summary = "Join the newsletter")
    public ResponseEntity<Map<String, String>> subscribe(@Valid @RequestBody SubscriberRequest request,
                                                         HttpServletRequest http) {
        limit("subscribe", SUBSCRIBE_LIMIT, http);
        community.subscribe(request);
        // Deliberately no body: whether this address was already on file is not the visitor's
        // business, and echoing the record back would leak that someone else had signed up.
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("status", "subscribed"));
    }

    @PostMapping("/book-reads")
    @Operation(summary = "Record that the e-book was opened")
    public ResponseEntity<Void> recordBookRead(HttpServletRequest http) {
        // Higher ceiling: this is a counter, not a submission, and a curious reader can open
        // the book many times in an hour without being an abuser.
        limit("book-read", BOOK_READ_LIMIT, http);
        community.recordBookRead();
        return ResponseEntity.noContent().build();
    }
}
