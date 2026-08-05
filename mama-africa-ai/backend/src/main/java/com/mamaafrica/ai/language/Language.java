package com.mamaafrica.ai.language;

import java.util.Locale;
import java.util.Optional;

public enum Language {

    ENGLISH("en", "English"),
    FRENCH("fr", "French"),
    SPANISH("es", "Spanish"),
    TWI("tw", "Twi");

    private final String code;
    private final String displayName;

    Language(String code, String displayName) {
        this.code = code;
        this.displayName = displayName;
    }

    public String code() {
        return code;
    }

    public String displayName() {
        return displayName;
    }

    /** Accepts a name ("French"), an ISO code ("fr") or an enum name. Case-insensitive. */
    public static Optional<Language> parse(String value) {
        if (value == null || value.isBlank()) {
            return Optional.empty();
        }
        var normalised = value.trim().toLowerCase(Locale.ROOT);
        for (var language : values()) {
            if (language.code.equals(normalised)
                    || language.displayName.toLowerCase(Locale.ROOT).equals(normalised)
                    || language.name().toLowerCase(Locale.ROOT).equals(normalised)) {
                return Optional.of(language);
            }
        }
        return Optional.empty();
    }
}
