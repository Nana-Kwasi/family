package com.mamaafrica.ai.user;

public enum Role {
    ADMIN,
    SUPER_ADMIN;

    public String authority() {
        return "ROLE_" + name();
    }
}
