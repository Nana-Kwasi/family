package com.mamaafrica.ai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

/** Enables @Async so document indexing runs off the request thread. */
@Configuration
@EnableAsync
public class AsyncConfig {
}
