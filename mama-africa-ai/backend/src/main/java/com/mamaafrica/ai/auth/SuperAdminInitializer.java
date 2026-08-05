package com.mamaafrica.ai.auth;

import com.mamaafrica.ai.config.AppProperties;
import com.mamaafrica.ai.user.Role;
import com.mamaafrica.ai.user.User;
import com.mamaafrica.ai.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/** Creates the first super admin so a fresh deployment is usable. No-op afterwards. */
@Configuration
public class SuperAdminInitializer {

    private static final Logger log = LoggerFactory.getLogger(SuperAdminInitializer.class);

    @Bean
    public ApplicationRunner seedSuperAdmin(UserRepository users, PasswordEncoder encoder, AppProperties props) {
        return args -> {
            var bootstrap = props.security().bootstrap();
            if (users.existsByEmailIgnoreCase(bootstrap.email())) {
                return;
            }
            users.save(new User(
                    bootstrap.email(),
                    encoder.encode(bootstrap.password()),
                    bootstrap.fullName(),
                    Role.SUPER_ADMIN));
            log.info("Created bootstrap super admin: {}", bootstrap.email());
        };
    }
}
