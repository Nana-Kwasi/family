package com.mamaafrica.ai.policy;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

/** Proof that one customer agreed to one version of one policy. Never updated, only added to. */
@Entity
@Table(name = "policy_acceptance")
public class PolicyAcceptance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(name = "policy_id", nullable = false)
    private Long policyId;

    @Enumerated(EnumType.STRING)
    @Column(name = "policy_kind", nullable = false, length = 32)
    private PolicyKind policyKind;

    @Column(name = "policy_version", nullable = false)
    private int policyVersion;

    @Column(name = "accepted_at", nullable = false, updatable = false)
    private Instant acceptedAt = Instant.now();

    @Column(name = "client_hash", length = 64)
    private String clientHash;

    protected PolicyAcceptance() {
    }

    public PolicyAcceptance(Long customerId, Policy policy, String clientHash) {
        this.customerId = customerId;
        this.policyId = policy.getId();
        this.policyKind = policy.getKind();
        this.policyVersion = policy.getVersion();
        this.clientHash = clientHash;
    }

    public PolicyKind getPolicyKind() {
        return policyKind;
    }

    public int getPolicyVersion() {
        return policyVersion;
    }

    public Instant getAcceptedAt() {
        return acceptedAt;
    }
}
