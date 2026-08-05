package com.mamaafrica.ai.language;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/**
 * Lightweight stop-word detector for the four supported languages.
 *
 * <p>Off-the-shelf detectors do not cover Twi, and pulling in a heavyweight model for
 * four languages is not worth it. Short, distinctive marker sets plus alphabet hints
 * (ɛ/ɔ for Twi, ñ/¿ for Spanish, ç/œ for French) are accurate enough, and the caller
 * can always pass an explicit language to bypass detection entirely.
 */
@Component
public class LanguageDetector {

    private static final Map<Language, Set<String>> MARKERS = Map.of(
            Language.ENGLISH, Set.of("the", "and", "is", "are", "you", "what", "how", "about", "tell",
                    "please", "hello", "who", "where", "was", "were", "with", "this", "that", "can", "of"),
            Language.FRENCH, Set.of("le", "la", "les", "des", "est", "et", "je", "vous", "une", "dans",
                    "pour", "qui", "bonjour", "merci", "comment", "pourquoi", "avec", "sur", "sont", "être"),
            Language.SPANISH, Set.of("el", "los", "las", "y", "es", "que", "por", "para", "una", "con",
                    "hola", "gracias", "como", "donde", "quien", "son", "del", "muy", "sobre", "cuando"),
            Language.TWI, Set.of("me", "wo", "yɛ", "ɛyɛ", "sɛ", "na", "aane", "daabi", "medaase",
                    "akwaaba", "adɛn", "wɔ", "nti", "deɛ", "kɔ", "ba", "ɔman", "ɛhe", "hwan", "biara")
    );

    private static final Map<Language, String> ALPHABET_HINTS = Map.of(
            Language.TWI, "ɛɔ",
            Language.SPANISH, "ñ¿¡",
            Language.FRENCH, "çœàèùâêîôû"
    );

    /** A distinctive character is worth this many stop-word hits. */
    private static final int ALPHABET_WEIGHT = 3;

    /**
     * @param text the user message
     * @return the most likely language, defaulting to {@link Language#ENGLISH}
     */
    public Language detect(String text) {
        if (text == null || text.isBlank()) {
            return Language.ENGLISH;
        }

        var lower = text.toLowerCase(Locale.ROOT);
        var words = List.of(lower.split("[^\\p{L}ɛɔ]+"));

        Language best = Language.ENGLISH;
        int bestScore = 0;

        for (var language : Language.values()) {
            int score = 0;
            var markers = MARKERS.get(language);
            for (var word : words) {
                if (markers.contains(word)) {
                    score++;
                }
            }
            var hints = ALPHABET_HINTS.get(language);
            if (hints != null) {
                for (var c : hints.toCharArray()) {
                    if (lower.indexOf(c) >= 0) {
                        score += ALPHABET_WEIGHT;
                    }
                }
            }
            if (score > bestScore) {
                bestScore = score;
                best = language;
            }
        }

        return best;
    }

    /** Uses the caller-supplied language when it is recognised, otherwise detects it. */
    public Language resolve(String requestedLanguage, String text) {
        return Language.parse(requestedLanguage).orElseGet(() -> detect(text));
    }
}
