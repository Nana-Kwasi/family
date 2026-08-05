package com.mamaafrica.ai.security;

import com.mamaafrica.ai.config.AppProperties;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Guards the one endpoint the public website calls. Disabled when
 * {@code app.security.public-api-key} is blank, which keeps local development friction-free.
 */
@Component
public class PublicApiKeyFilter extends OncePerRequestFilter {

    private static final String HEADER = "X-Api-Key";

    private final AppProperties.Security security;

    public PublicApiKeyFilter(AppProperties props) {
        this.security = props.security();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !security.publicApiKeyEnabled()
                || !request.getRequestURI().startsWith("/api/chat");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        if (security.publicApiKey().equals(request.getHeader(HEADER))) {
            chain.doFilter(request, response);
            return;
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write("{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Missing or invalid API key\"}");
    }
}
