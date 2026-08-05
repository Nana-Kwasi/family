package com.mamaafrica.ai.knowledge;

import java.util.UUID;

/**
 * Raised when a document needs (re-)indexing. Handled after the surrounding transaction commits,
 * so the indexing thread is guaranteed to see the saved row.
 */
public record DocumentIndexRequested(UUID documentId) {
}
