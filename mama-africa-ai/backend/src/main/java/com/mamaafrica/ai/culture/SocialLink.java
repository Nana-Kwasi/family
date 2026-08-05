package com.mamaafrica.ai.culture;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

/** A labelled outbound link shown beneath a story. */
@Embeddable
public class SocialLink {

    @Column(name = "label", nullable = false, length = 120)
    private String label;

    @Column(name = "url", nullable = false, length = 1000)
    private String url;

    protected SocialLink() {
    }

    public SocialLink(String label, String url) {
        this.label = label;
        this.url = url;
    }

    public String getLabel() {
        return label;
    }

    public String getUrl() {
        return url;
    }
}
