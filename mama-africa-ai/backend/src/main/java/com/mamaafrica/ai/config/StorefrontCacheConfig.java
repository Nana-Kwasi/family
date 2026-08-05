package com.mamaafrica.ai.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ShallowEtagHeaderFilter;

/**
 * Adds ETags to the public storefront reads.
 *
 * <p>The storefront sends {@code Cache-Control: no-cache} so an admin's edit is visible on the
 * next page load rather than up to a max-age later. That alone would re-send the whole
 * catalogue on every navigation; an ETag turns the common case — nothing changed since the
 * visitor last looked — into a 304 with no body.
 *
 * <p>Scoped to {@code /api/storefront/*} deliberately. The filter buffers each response to
 * hash it, which is worth paying for a small, frequently-repeated, unauthenticated payload and
 * is not worth paying for admin traffic or streamed chat responses.
 */
@Configuration
public class StorefrontCacheConfig {

    @Bean
    public FilterRegistrationBean<ShallowEtagHeaderFilter> storefrontEtagFilter() {
        var registration = new FilterRegistrationBean<>(new ShallowEtagHeaderFilter());
        registration.addUrlPatterns("/api/storefront/*");
        registration.setName("storefrontEtagFilter");
        return registration;
    }
}
