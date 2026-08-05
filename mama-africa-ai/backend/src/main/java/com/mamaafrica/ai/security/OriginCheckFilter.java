package com.mamaafrica.ai.security;

import com.mamaafrica.ai.config.AppProperties;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Refuses browser requests that claim to come from somewhere other than our own site.
 *
 * <p>Worth being honest about what this is: a nuisance filter, not a wall. A browser sets
 * Origin itself and will not let a page lie about it, so this does stop someone embedding our
 * API in their own site. Anything that is not a browser — curl, a script — can put whatever it
 * likes in the header, so this is no defence against a determined caller. The real protections
 * are the account requirement on chat and the spend cap behind it.
 *
 * <p>Applies only to state-changing methods. A GET carries no Origin when typed into the
 * address bar, and refusing those would break ordinary links.
 */
@Component
public class OriginCheckFilter extends OncePerRequestFilter {

    private static final AntPathMatcher MATCHER = new AntPathMatcher();
    private static final List<String> GUARDED = List.of(
            "/api/chat/**", "/api/culture/**", "/api/support/messages", "/api/account/**");

    private final List<String> allowed;

    public OriginCheckFilter(AppProperties props) {
        this.allowed = props.cors().allowedOrigins();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        if ("GET".equals(request.getMethod()) || "OPTIONS".equals(request.getMethod())) {
            return true;
        }
        return GUARDED.stream().noneMatch(p -> MATCHER.match(p, request.getRequestURI()));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        var origin = request.getHeader("Origin");

        // No Origin at all is allowed through: server-to-server callers legitimately send none,
        // and rejecting them would break any future integration for no security gain.
        if (origin == null || origin.isBlank() || matchesAllowed(origin)) {
            chain.doFilter(request, response);
            return;
        }

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(
                "{\"status\":403,\"error\":\"Forbidden\",\"message\":\"This request did not come from Mama Africa Official.\"}");
    }

    /** Reuses the CORS patterns, so there is one list of trusted origins rather than two. */
    private boolean matchesAllowed(String origin) {
        return allowed.stream().anyMatch(pattern -> {
            var glob = pattern.replace("[*]", "*");
            return MATCHER.match(glob, origin) || glob.equals(origin);
        });
    }
}
