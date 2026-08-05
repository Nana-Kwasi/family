package com.mamaafrica.ai.config;

import com.mamaafrica.ai.security.JwtAuthenticationFilter;
import com.mamaafrica.ai.security.OriginCheckFilter;
import com.mamaafrica.ai.security.PublicApiKeyFilter;
import com.mamaafrica.ai.security.RestAuthenticationHandler;
import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private static final String CUSTOMER = "CUSTOMER";
    private static final String ADMIN = "ADMIN";
    private static final String SUPER_ADMIN = "SUPER_ADMIN";

    private static final String[] PUBLIC_PATHS = {
            "/api/auth/login",
            "/api/account/signup",
            "/api/account/login",
            "/api/account/forgot-password",
            "/api/account/reset-password",
            "/actuator/health/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html"
    };

    /**
     * The shop the website renders to anonymous visitors. Read-only by construction — the
     * storefront controller exposes no mutating endpoint — so it is safe to open up. Writes
     * live under /api/market, which is not listed here and therefore needs a JWT.
     */
    private static final String[] PUBLIC_GET_PATHS = {
            "/api/storefront/**",
            "/api/culture/stories/**",
            "/api/culture/stories",
            "/api/culture/diaspora-stories",
            "/api/culture/reviews",
            // A visitor must be able to read what they are agreeing to before they have an
            // account. /api/policies/admin is not listed, so drafting still needs an admin.
            "/api/policies",
            "/api/policies/signup",
            "/api/policies/TERMS",
            "/api/policies/PRIVACY",
            "/api/policies/COOKIES",
            "/api/policies/AI_ASSISTANT",
            "/api/policies/DATA_PROCESSING",
            "/api/policies/CONTENT_SUBMISSION",
            "/api/policies/SHIPPING_RETURNS",
            "/api/policies/MARKETING"
    };

    /**
     * The writes the website has always let an anonymous visitor make: sharing a diaspora
     * story, rating something, joining the newsletter, opening the e-book.
     *
     * <p>Listed one path at a time rather than as {@code /api/culture/**} so that adding a
     * future endpoint under that prefix does not silently become public. The admin matcher
     * below is declared first regardless, so /api/culture/admin can never fall through here.
     */
    private static final String[] PUBLIC_POST_PATHS = {
            "/api/culture/diaspora-stories",
            "/api/culture/reviews",
            "/api/culture/subscribers",
            "/api/culture/book-reads",
            // Someone with a problem should not have to sign in to report it. Rate-limited
            // server-side instead — /api/support/admin/** stays admin-only via the tail rule.
            "/api/support/messages"
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           JwtAuthenticationFilter jwtFilter,
                                           PublicApiKeyFilter apiKeyFilter,
                                           OriginCheckFilter originFilter,
                                           RestAuthenticationHandler authenticationHandler) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                // Picks up the corsConfigurationSource bean below.
                .cors(Customizer.withDefaults())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Spring Security 6 authorizes every dispatch type, not just the initial
                        // request. A streaming endpoint is dispatched a second time (ASYNC) once
                        // the emitter completes, and by then the SecurityContext has been cleared
                        // — so the rules below would deny a request they had already allowed, and
                        // abort the stream mid-answer with the response too far gone to explain
                        // why. An ASYNC dispatch is the tail of a request that was authorized on
                        // the way in, and ERROR is the container rendering our own error page;
                        // neither is a fresh call from a client, so neither is a decision point.
                        .dispatcherTypeMatchers(DispatcherType.ASYNC, DispatcherType.ERROR).permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(PUBLIC_PATHS).permitAll()
                        .requestMatchers(HttpMethod.GET, PUBLIC_GET_PATHS).permitAll()
                        .requestMatchers(HttpMethod.POST, PUBLIC_POST_PATHS).permitAll()
                        // A visitor's own account, and nothing else.
                        .requestMatchers("/api/account/**").hasRole(CUSTOMER)
                        // Chat costs money per call, and a credential a browser sends is
                        // always visible in developer tools. An account is the only thing a
                        // stranger cannot copy off the page, so Afia now requires one.
                        .requestMatchers("/api/chat/**").hasRole(CUSTOMER)
                        // Everything else is operator territory. Stated as a role rather than
                        // merely `authenticated()`: a customer token authenticates perfectly
                        // well, so "logged in" is not the question — "logged in as what" is.
                        // This also means a new admin endpoint is protected the moment it is
                        // written, rather than when somebody remembers to list it here.
                        .anyRequest().hasAnyRole(ADMIN, SUPER_ADMIN))
                .exceptionHandling(handling -> handling
                        .authenticationEntryPoint(authenticationHandler)
                        .accessDeniedHandler(authenticationHandler))
                .addFilterBefore(originFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(apiKeyFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(AppProperties props) {
        var config = new CorsConfiguration();
        config.setAllowedOriginPatterns(props.cors().allowedOrigins());
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
