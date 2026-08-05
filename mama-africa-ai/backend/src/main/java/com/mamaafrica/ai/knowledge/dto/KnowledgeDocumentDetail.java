package com.mamaafrica.ai.knowledge.dto;

import com.mamaafrica.ai.knowledge.KnowledgeDocument;

/** Adds the extracted text so the admin console can preview what the AI actually sees. */
public record KnowledgeDocumentDetail(KnowledgeDocumentResponse document, String content) {

    public static KnowledgeDocumentDetail from(KnowledgeDocument document) {
        return new KnowledgeDocumentDetail(KnowledgeDocumentResponse.from(document), document.getContent());
    }
}
