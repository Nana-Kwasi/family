package com.mamaafrica.ai.knowledge;

public enum DocumentStatus {
    /** Uploaded and text extracted, waiting for the indexer. */
    PENDING,
    /** Chunking and embedding in progress. */
    INDEXING,
    /** Searchable in Qdrant. */
    INDEXED,
    /** Indexing failed — see errorMessage. */
    FAILED
}
