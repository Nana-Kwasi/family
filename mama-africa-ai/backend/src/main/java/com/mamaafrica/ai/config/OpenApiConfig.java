package com.mamaafrica.ai.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI mamaAfricaOpenApi() {
        var bearer = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");

        var apiKey = new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY)
                .in(SecurityScheme.In.HEADER)
                .name("X-Api-Key");

        return new OpenAPI()
                .info(new Info()
                        .title("Mama Africa AI API")
                        .version("1.0.0")
                        .description("""
                                Centralised AI backend for the Mama Africa website.
                                The public website only calls POST /api/chat — everything else is admin-only."""))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", bearer)
                        .addSecuritySchemes("apiKey", apiKey))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
