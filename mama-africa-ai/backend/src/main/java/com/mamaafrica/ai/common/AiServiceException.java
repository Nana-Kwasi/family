package com.mamaafrica.ai.common;

/** The configured model provider could not be reached or returned an error. */
public class AiServiceException extends RuntimeException {

    public AiServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
