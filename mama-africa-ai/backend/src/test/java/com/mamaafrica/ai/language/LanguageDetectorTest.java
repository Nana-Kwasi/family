package com.mamaafrica.ai.language;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.assertThat;

class LanguageDetectorTest {

    private final LanguageDetector detector = new LanguageDetector();

    @ParameterizedTest
    @CsvSource({
            "'Tell me about the kingdoms of Ghana', ENGLISH",
            "'Bonjour, pouvez-vous me parler des royaumes du Ghana', FRENCH",
            "'Hola, ¿puedes hablarme de los reinos de Ghana?', SPANISH",
            "'Akwaaba! Me pɛ sɛ mesua Ghana abakɔsɛm', TWI"
    })
    void detectsSupportedLanguages(String text, Language expected) {
        assertThat(detector.detect(text)).isEqualTo(expected);
    }

    @Test
    void fallsBackToEnglishForUnknownInput() {
        assertThat(detector.detect("???")).isEqualTo(Language.ENGLISH);
        assertThat(detector.detect("")).isEqualTo(Language.ENGLISH);
        assertThat(detector.detect(null)).isEqualTo(Language.ENGLISH);
    }

    @Test
    void explicitLanguageWinsOverDetection() {
        assertThat(detector.resolve("French", "Tell me about the kingdoms")).isEqualTo(Language.FRENCH);
        assertThat(detector.resolve("fr", "Tell me about the kingdoms")).isEqualTo(Language.FRENCH);
    }

    @Test
    void unrecognisedLanguageLabelFallsBackToDetection() {
        assertThat(detector.resolve("Klingon", "Bonjour et merci pour les informations"))
                .isEqualTo(Language.FRENCH);
    }
}
