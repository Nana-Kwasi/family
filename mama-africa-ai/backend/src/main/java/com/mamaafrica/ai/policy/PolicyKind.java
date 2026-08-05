package com.mamaafrica.ai.policy;

/**
 * The policies this system needs. AI_ASSISTANT and CONTENT_SUBMISSION exist because this site
 * does two things a shop normally does not: it runs an AI assistant that stores conversations,
 * and it publishes text written by visitors.
 */
public enum PolicyKind {
    TERMS,
    PRIVACY,
    COOKIES,
    AI_ASSISTANT,
    DATA_PROCESSING,
    CONTENT_SUBMISSION,
    SHIPPING_RETURNS,
    MARKETING
}
