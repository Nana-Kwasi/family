package com.mamaafrica.ai.culture;

import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.culture.dto.StoryRequest;
import com.mamaafrica.ai.culture.dto.StoryResponse;
import com.mamaafrica.ai.culture.dto.StorySummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
public class StoryService {

    private final StoryRepository stories;

    public StoryService(StoryRepository stories) {
        this.stories = stories;
    }

    @Transactional(readOnly = true)
    public Page<StorySummary> list(String search, StoryKind kind, Boolean published, Pageable pageable) {
        String pattern = (search == null || search.isBlank())
                ? null
                : "%" + search.trim().toLowerCase(Locale.ROOT) + "%";
        return stories.search(pattern, kind, published, pageable).map(StorySummary::from);
    }

    @Transactional(readOnly = true)
    public List<StoryResponse> published() {
        return stories.findPublished().stream().map(StoryResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public StoryResponse get(Long id) {
        return StoryResponse.from(stories.findWithDetailById(id)
                .orElseThrow(() -> new NotFoundException("Story " + id + " not found")));
    }

    @Transactional(readOnly = true)
    public StoryResponse getPublished(String slug) {
        return StoryResponse.from(stories.findWithDetailBySlug(slug)
                .filter(Story::isPublished)
                .orElseThrow(() -> new NotFoundException("Story " + slug + " not found")));
    }

    @Transactional
    public StoryResponse create(StoryRequest request, String actor) {
        var story = new Story();
        apply(story, request, actor);
        story.setSlug(uniqueSlug(titleOrExcerpt(request), null));
        return StoryResponse.from(stories.save(story));
    }

    @Transactional
    public StoryResponse update(Long id, StoryRequest request, String actor) {
        var story = stories.findWithDetailById(id)
                .orElseThrow(() -> new NotFoundException("Story " + id + " not found"));
        apply(story, request, actor);
        // The slug is the story's public address; leave it alone once published.
        return StoryResponse.from(stories.save(story));
    }

    @Transactional
    public void delete(Long id) {
        if (!stories.existsById(id)) {
            throw new NotFoundException("Story " + id + " not found");
        }
        stories.deleteById(id);
    }

    @Transactional
    public StoryResponse setPublished(Long id, boolean published, String actor) {
        var story = stories.findWithDetailById(id)
                .orElseThrow(() -> new NotFoundException("Story " + id + " not found"));
        story.setPublished(published);
        story.touch(actor);
        return StoryResponse.from(stories.save(story));
    }

    private void apply(Story story, StoryRequest r, String actor) {
        story.setKind(r.kind());
        story.setTitle(blankToNull(r.title()));
        story.setContent(r.content().trim());
        // A proverb is a single thought: it is filed as general and never has chapters.
        story.setContentType(r.kind() == StoryKind.PROVERB
                ? ContentType.GENERAL
                : (r.contentType() == null ? ContentType.GENERAL : r.contentType()));
        story.setAuthor(blankToNull(r.author()));
        if (r.published() != null) {
            story.setPublished(r.published());
        }
        if (r.sortOrder() != null) {
            story.setSortOrder(r.sortOrder());
        }

        var chapters = (r.kind() == StoryKind.PROVERB || r.chapters() == null)
                ? List.<Chapter>of()
                : r.chapters().stream()
                        .filter(c -> c.content() != null && !c.content().isBlank())
                        .map(c -> new Chapter(blankToNull(c.heading()), c.content().trim()))
                        .toList();
        story.getChapters().clear();
        story.getChapters().addAll(chapters);

        var links = r.socialLinks() == null
                ? List.<SocialLink>of()
                : r.socialLinks().stream()
                        .filter(l -> l.label() != null && !l.label().isBlank()
                                && l.url() != null && !l.url().isBlank())
                        .map(l -> new SocialLink(l.label().trim(), l.url().trim()))
                        .toList();
        story.getSocialLinks().clear();
        story.getSocialLinks().addAll(links);

        story.touch(actor);
    }

    /** Stories may be untitled, so fall back to the opening words of the body. */
    private static String titleOrExcerpt(StoryRequest r) {
        if (r.title() != null && !r.title().isBlank()) {
            return r.title();
        }
        String[] words = r.content().trim().split("\\s+");
        return String.join(" ", List.of(words).subList(0, Math.min(words.length, 8)));
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }

    private String uniqueSlug(String source, String currentSlug) {
        String base = Story.toSlug(source);
        if (base.isEmpty()) {
            throw new BadRequestException("Cannot derive a web address from this story");
        }
        if (base.equals(currentSlug)) {
            return base;
        }
        String candidate = base;
        int suffix = 2;
        while (stories.existsBySlug(candidate)) {
            candidate = base + "-" + suffix++;
        }
        return candidate;
    }
}
