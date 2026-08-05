package com.mamaafrica.ai.security;

import com.mamaafrica.ai.customer.Customer;
import com.mamaafrica.ai.customer.CustomerRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";
    /** Website visitors all have the same privilege level; there is nothing to sub-divide. */
    public static final String CUSTOMER_AUTHORITY = "ROLE_CUSTOMER";

    private final JwtService jwtService;
    private final AppUserDetailsService userDetailsService;
    private final CustomerRepository customers;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   AppUserDetailsService userDetailsService,
                                   CustomerRepository customers) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.customers = customers;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        var header = request.getHeader("Authorization");
        if (header != null && header.startsWith(BEARER_PREFIX)
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            jwtService.parse(header.substring(BEARER_PREFIX.length())).ifPresent(claims -> {
                String email = claims.getSubject();
                String type = claims.get(JwtService.TYPE_CLAIM, String.class);

                // The token states which population it belongs to, and that decides which store
                // is consulted. A customer token is never looked up among the operators, so an
                // email that exists in both tables cannot escalate anyone.
                if (JwtService.TYPE_CUSTOMER.equals(type)) {
                    authenticateCustomer(email, request);
                } else {
                    // Tokens issued before customer accounts existed carry no type claim, and
                    // could only ever have belonged to an operator.
                    authenticateAdmin(email, request);
                }
            });
        }

        chain.doFilter(request, response);
    }

    private void authenticateAdmin(String email, HttpServletRequest request) {
        try {
            var user = userDetailsService.loadUserByUsername(email);
            if (!user.isEnabled()) {
                return;
            }
            setAuthentication(new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()), request);
        } catch (UsernameNotFoundException e) {
            logger.debug("Token references an operator that no longer exists: " + email);
        }
    }

    private void authenticateCustomer(String email, HttpServletRequest request) {
        customers.findByEmailIgnoreCase(email)
                .filter(Customer::isEnabled)
                .ifPresent(customer -> {
                    var principal = new CustomerPrincipal(customer.getId(), customer.getEmail(),
                            customer.preferredName(), customer.getFullName(),
                            customer.getAkanName(), customer.getDayBorn());
                    setAuthentication(new UsernamePasswordAuthenticationToken(
                            principal, null, List.of(new SimpleGrantedAuthority(CUSTOMER_AUTHORITY))), request);
                });
    }

    private void setAuthentication(UsernamePasswordAuthenticationToken auth, HttpServletRequest request) {
        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}
