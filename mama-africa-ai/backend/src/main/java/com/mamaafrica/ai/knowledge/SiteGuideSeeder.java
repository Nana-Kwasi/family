package com.mamaafrica.ai.knowledge;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;

/**
 * Seeds the assistant's guide to the website into the knowledge base on first start.
 *
 * <p>Without it, Afia can talk about Ghana but not about the site she lives on — "how do I get
 * my certificate?" has no source to retrieve from. The guide ships as a classpath resource so a
 * fresh deployment answers site questions immediately rather than waiting for someone to
 * remember to upload it.
 *
 * <p>Refreshed on start whenever the shipped text differs from what is stored, and re-indexed.
 * The first version of this skipped an existing copy entirely — which meant that after password
 * reset was built, Afia carried on telling people it did not exist, quoting a guide nobody had
 * updated. A document describing the site is only useful if it cannot drift from it.
 *
 * <p>The trade-off is deliberate: hand edits to <em>this one</em> document are replaced when the
 * shipped copy changes. Anything the team writes itself should be a separate upload.
 */
@Configuration
public class SiteGuideSeeder {

    private static final Logger log = LoggerFactory.getLogger(SiteGuideSeeder.class);

    private static final String RESOURCE = "knowledge/site-guide.md";
    private static final String FILE_NAME = "site-guide.md";
    private static final String TITLE = "Guide to the Mama Africa website";
    private static final String CATEGORY_SLUG = "faqs";

    @Bean
    ApplicationRunner seedSiteGuide(KnowledgeDocumentRepository documents,
                                    KnowledgeCategoryRepository categories,
                                    KnowledgeService knowledgeService) {
        return args -> seed(documents, categories, knowledgeService);
    }

    @Transactional
    void seed(KnowledgeDocumentRepository documents,
              KnowledgeCategoryRepository categories,
              KnowledgeService knowledgeService) {

        String content = read();

        var existing = documents.findFirstByFileName(FILE_NAME);
        if (existing.isPresent()) {
            var document = existing.get();
            if (content.equals(document.getContent())) {
                log.debug("Site guide is current — nothing to do");
                return;
            }
            document.replaceContent(content);
            documents.save(document);
            log.info("Site guide has changed — re-indexing so the assistant stops quoting the old text");
            knowledgeService.requestIndexing(document.getId());
            return;
        }

        var category = categories.findBySlug(CATEGORY_SLUG).orElse(null);

        var document = documents.save(new KnowledgeDocument(
                TITLE,
                FILE_NAME,
                "text/markdown",
                content.getBytes(StandardCharsets.UTF_8).length,
                category,
                content,
                "system"));

        log.info("Seeded the site guide into the knowledge base ({} characters) — indexing now",
                content.length());
        knowledgeService.requestIndexing(document.getId());
    }

    private static String read() {
        try (var stream = new ClassPathResource(RESOURCE).getInputStream()) {
            return new String(stream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new UncheckedIOException("Could not read " + RESOURCE + " from the classpath", e);
        }
    }
}
