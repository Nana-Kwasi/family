package com.mamaafrica.ai.user;

import com.mamaafrica.ai.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class UsersApiTest extends IntegrationTest {

    @Autowired
    private UserRepository users;

    @Test
    void superAdminCanCreateAndListAdmins() throws Exception {
        var token = adminToken();

        mockMvc.perform(post("/api/users")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"editor@test.local","fullName":"Ama Editor",
                                 "password":"EditorPass123","role":"ADMIN"}"""))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("editor@test.local"))
                .andExpect(jsonPath("$.role").value("ADMIN"))
                .andExpect(jsonPath("$.enabled").value(true));

        mockMvc.perform(get("/api/users").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void duplicateEmailIsRejected() throws Exception {
        mockMvc.perform(post("/api/users")
                        .header("Authorization", adminToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"admin@test.local","fullName":"Copy",
                                 "password":"AnotherPass123","role":"ADMIN"}"""))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shortPasswordIsRejected() throws Exception {
        mockMvc.perform(post("/api/users")
                        .header("Authorization", adminToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"weak@test.local","fullName":"Weak",
                                 "password":"short","role":"ADMIN"}"""))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.details").isArray());
    }

    @Test
    void adminsCannotReachUserManagement() throws Exception {
        var token = adminToken();
        mockMvc.perform(post("/api/users")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"editor@test.local","fullName":"Ama Editor",
                                 "password":"EditorPass123","role":"ADMIN"}"""))
                .andExpect(status().isCreated());

        var editorToken = tokenFor("editor@test.local", "EditorPass123");

        mockMvc.perform(get("/api/users").header("Authorization", editorToken))
                .andExpect(status().isForbidden());
    }

    @Test
    void youCannotLockYourselfOut() throws Exception {
        var token = adminToken();
        var self = users.findByEmailIgnoreCase("admin@test.local").orElseThrow();

        mockMvc.perform(put("/api/users/{id}", self.getId())
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"fullName":"Test Admin","role":"SUPER_ADMIN","enabled":false}"""))
                .andExpect(status().isBadRequest());

        mockMvc.perform(put("/api/users/{id}", self.getId())
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"fullName":"Test Admin","role":"ADMIN","enabled":true}"""))
                .andExpect(status().isBadRequest());

        mockMvc.perform(delete("/api/users/{id}", self.getId()).header("Authorization", token))
                .andExpect(status().isBadRequest());
    }

    @Test
    void passwordCanBeChangedAndTheOldOneStopsWorking() throws Exception {
        mockMvc.perform(put("/api/auth/password")
                        .header("Authorization", adminToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"currentPassword":"TestPassword123!","newPassword":"BrandNewPass456"}"""))
                .andExpect(status().isNoContent());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON).content(ADMIN_LOGIN))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"admin@test.local","password":"BrandNewPass456"}"""))
                .andExpect(status().isOk());
    }

    @Test
    void wrongCurrentPasswordIsRejected() throws Exception {
        mockMvc.perform(put("/api/auth/password")
                        .header("Authorization", adminToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"currentPassword":"not-my-password","newPassword":"BrandNewPass456"}"""))
                .andExpect(status().isBadRequest());
    }

    private String tokenFor(String email, String password) throws Exception {
        var response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"%s","password":"%s"}""".formatted(email, password)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        return "Bearer " + objectMapper.readTree(response).get("token").asText();
    }
}
