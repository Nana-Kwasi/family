package com.mamaafrica.ai.culture;

import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.culture.dto.DiasporaStoryRequest;
import com.mamaafrica.ai.culture.dto.DiasporaStoryResponse;
import com.mamaafrica.ai.culture.dto.ReviewRequest;
import com.mamaafrica.ai.culture.dto.ReviewResponse;
import com.mamaafrica.ai.culture.dto.SubscriberRequest;
import com.mamaafrica.ai.culture.dto.SubscriberResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

/**
 * Everything visitors contribute: diaspora stories, ratings, newsletter sign-ups and e-book
 * opens. Reads and writes both go through here — the website no longer talks to Firestore.
 */
@Service
public class CommunityService {

    private static final String ANONYMOUS = "Anonymous";

    private final DiasporaStoryRepository diasporaStories;
    private final ReviewRepository reviews;
    private final SubscriberRepository subscribers;
    private final BookReadRepository bookReads;

    public CommunityService(DiasporaStoryRepository diasporaStories,
                            ReviewRepository reviews,
                            SubscriberRepository subscribers,
                            BookReadRepository bookReads) {
        this.diasporaStories = diasporaStories;
        this.reviews = reviews;
        this.subscribers = subscribers;
        this.bookReads = bookReads;
    }

    // ── Diaspora stories ────────────────────────────────────────────────────

    /** The public wall. Approved submissions only, newest first. */
    @Transactional(readOnly = true)
    public List<DiasporaStoryResponse> publicDiasporaStories() {
        return diasporaStories.findPublic().stream().map(DiasporaStoryResponse::from).toList();
    }

    /** A visitor's submission. Published immediately, as the site has always behaved. */
    @Transactional
    public DiasporaStoryResponse submitDiasporaStory(DiasporaStoryRequest request) {
        var story = new DiasporaStory(
                request.name().trim(),
                blankToNull(request.country()),
                blankToNull(request.akanName()),
                request.story().trim());
        return DiasporaStoryResponse.from(diasporaStories.save(story));
    }

    @Transactional(readOnly = true)
    public Page<DiasporaStoryResponse> listDiasporaStories(ModerationStatus status, Pageable pageable) {
        return diasporaStories.search(status, pageable).map(DiasporaStoryResponse::from);
    }

    @Transactional
    public DiasporaStoryResponse moderateDiasporaStory(Long id, ModerationStatus status, String actor) {
        var story = diasporaStories.findById(id)
                .orElseThrow(() -> new NotFoundException("Diaspora story " + id + " not found"));
        story.moderate(status, actor);
        return DiasporaStoryResponse.from(diasporaStories.save(story));
    }

    @Transactional
    public void deleteDiasporaStory(Long id) {
        if (!diasporaStories.existsById(id)) {
            throw new NotFoundException("Diaspora story " + id + " not found");
        }
        diasporaStories.deleteById(id);
    }

    // ── Reviews ─────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<ReviewResponse> publicReviews(ReviewSubject subject, Long subjectId) {
        return reviews.findPublic(subject, subjectId).stream().map(ReviewResponse::from).toList();
    }

    @Transactional
    public ReviewResponse submitReview(ReviewRequest request) {
        // The e-book is a single thing; everything else has to say what it is about, or the
        // rating would be orphaned and never render anywhere.
        Long subjectId = request.subject() == ReviewSubject.BOOK ? null : request.subjectId();
        if (request.subject() != ReviewSubject.BOOK && subjectId == null) {
            throw new BadRequestException("A review of a " + request.subject() + " needs a subject id");
        }

        var review = new Review(
                request.subject(),
                subjectId,
                blankToNull(request.subjectTitle()),
                blankOr(request.name(), ANONYMOUS),
                (short) request.rating(),
                blankToNull(request.comment()));
        return ReviewResponse.from(reviews.save(review));
    }

    @Transactional(readOnly = true)
    public Page<ReviewResponse> listReviews(ReviewSubject subject, ModerationStatus status, Pageable pageable) {
        return reviews.search(subject, status, pageable).map(ReviewResponse::from);
    }

    @Transactional
    public ReviewResponse moderateReview(Long id, ModerationStatus status, String actor) {
        var review = reviews.findById(id)
                .orElseThrow(() -> new NotFoundException("Review " + id + " not found"));
        review.moderate(status, actor);
        return ReviewResponse.from(reviews.save(review));
    }

    @Transactional
    public void deleteReview(Long id) {
        if (!reviews.existsById(id)) {
            throw new NotFoundException("Review " + id + " not found");
        }
        reviews.deleteById(id);
    }

    // ── Subscribers and readership ──────────────────────────────────────────

    /**
     * Signing up twice is not an error worth showing a visitor — the second attempt simply
     * returns the record already on file.
     */
    @Transactional
    public SubscriberResponse subscribe(SubscriberRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        return subscribers.findByEmailIgnoreCase(email)
                .map(SubscriberResponse::from)
                .orElseGet(() -> SubscriberResponse.from(subscribers.save(new Subscriber(
                        email,
                        blankToNull(request.akanName()),
                        blankToNull(request.dayBorn()),
                        blankToNull(request.dob()),
                        blankToNull(request.source())))));
    }

    @Transactional(readOnly = true)
    public Page<SubscriberResponse> listSubscribers(Pageable pageable) {
        return subscribers.findAllByOrderByCreatedAtDesc(pageable).map(SubscriberResponse::from);
    }

    @Transactional
    public void recordBookRead() {
        bookReads.save(BookRead.now());
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }

    private static String blankOr(String value, String fallback) {
        return (value == null || value.isBlank()) ? fallback : value.trim();
    }
}
