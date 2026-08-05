package com.mamaafrica.ai.culture;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

/** One section of a long story. The heading is optional; the body is not. */
@Embeddable
public class Chapter {

    @Column(name = "heading")
    private String heading;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    protected Chapter() {
    }

    public Chapter(String heading, String content) {
        this.heading = heading;
        this.content = content;
    }

    public String getHeading() {
        return heading;
    }

    public String getContent() {
        return content;
    }
}
