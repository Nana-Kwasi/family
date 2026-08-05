package com.mamaafrica.ai.auth;

import com.mamaafrica.ai.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthApiTest extends IntegrationTest {

    @Test
    void bootstrapSuperAdminCanLogIn() throws Exception {
        mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(ADMIN_LOGIN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.user.role").value("SUPER_ADMIN"));
    }

    @Test
    void wrongPasswordIsRejected() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"admin@test.local","password":"wrong"}"""))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void protectedEndpointsRequireAToken() throws Exception {
        mockMvc.perform(get("/api/conversations")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/auth/me")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/knowledge")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/categories")).andExpect(status().isUnauthorized());
    }

    @Test
    void tokenGrantsAccessToProtectedEndpoints() throws Exception {
        var token = adminToken();

        mockMvc.perform(get("/api/auth/me").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("admin@test.local"));

        mockMvc.perform(get("/api/conversations").header("Authorization", token))
                .andExpect(status().isOk());
    }
}
