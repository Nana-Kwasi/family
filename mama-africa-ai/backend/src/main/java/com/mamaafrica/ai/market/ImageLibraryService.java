package com.mamaafrica.ai.market;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Stream;

/**
 * Browses the website's image folder so the console can offer a picker instead of asking an
 * admin to type <code>/images/friday-borns/kofi/kofi-1.png</code> by hand.
 *
 * <p>Read-only, and deliberately so: the files belong to the website's static assets and are
 * deployed with it. This service only ever lists what is already there.
 */
@Service
public class ImageLibraryService {

    private static final Logger log = LoggerFactory.getLogger(ImageLibraryService.class);
    private static final Set<String> EXTENSIONS = Set.of(".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif");
    private static final int MAX_RESULTS = 2000;

    private final Path root;

    public ImageLibraryService(@Value("${market.image-root:}") String imageRoot) {
        this.root = (imageRoot == null || imageRoot.isBlank()) ? null : Path.of(imageRoot).toAbsolutePath().normalize();
        if (root == null) {
            log.info("market.image-root is not set — the console's image picker will be empty");
        } else if (!Files.isDirectory(root)) {
            log.warn("market.image-root '{}' is not a directory — the image picker will be empty", root);
        }
    }

    public boolean available() {
        return root != null && Files.isDirectory(root);
    }

    /**
     * Web paths, relative to the site root, of every image under the configured folder.
     *
     * @param search optional case-insensitive substring filter
     */
    public List<String> list(String search) {
        if (!available()) {
            return List.of();
        }
        String needle = (search == null || search.isBlank()) ? null : search.trim().toLowerCase(Locale.ROOT);

        try (Stream<Path> walk = Files.walk(root)) {
            return walk.filter(Files::isRegularFile)
                    .map(root::relativize)
                    .map(p -> "/images/" + p.toString().replace('\\', '/'))
                    .filter(ImageLibraryService::isImage)
                    .filter(p -> needle == null || p.toLowerCase(Locale.ROOT).contains(needle))
                    .sorted(Comparator.naturalOrder())
                    .limit(MAX_RESULTS)
                    .toList();
        } catch (IOException e) {
            throw new UncheckedIOException("Could not read the image library at " + root, e);
        }
    }

    private static boolean isImage(String path) {
        String lower = path.toLowerCase(Locale.ROOT);
        return EXTENSIONS.stream().anyMatch(lower::endsWith);
    }
}
