package com.mamaafrica.ai.policy;

import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.policy.dto.PolicyRequest;
import com.mamaafrica.ai.policy.dto.PolicyResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class PolicyService {

    private final PolicyRepository policies;
    private final PolicyAcceptanceRepository acceptances;

    public PolicyService(PolicyRepository policies, PolicyAcceptanceRepository acceptances) {
        this.policies = policies;
        this.acceptances = acceptances;
    }

    @Transactional(readOnly = true)
    public List<PolicyResponse> listAll() {
        return policies.findAllOrdered().stream().map(PolicyResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<PolicyResponse> listPublished() {
        return policies.findPublished().stream().map(PolicyResponse::from).toList();
    }

    /** What the sign-up form must show and get a tick for. */
    @Transactional(readOnly = true)
    public List<PolicyResponse> listRequiredAtSignup() {
        return policies.findRequiredAtSignup().stream().map(PolicyResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public PolicyResponse getPublished(PolicyKind kind) {
        return policies.findByKind(kind)
                .filter(Policy::isPublished)
                .map(PolicyResponse::from)
                .orElseThrow(() -> new NotFoundException("No published policy for " + kind));
    }

    @Transactional
    public PolicyResponse update(Long id, PolicyRequest request, String actor) {
        var policy = require(id);
        policy.edit(request.title().trim(), blankToNull(request.summary()), request.body().trim(),
                request.requiredAtSignup(), actor);
        if (request.sortOrder() != null) {
            policy.setSortOrder(request.sortOrder());
        }
        return PolicyResponse.from(policies.save(policy));
    }

    @Transactional
    public PolicyResponse publish(Long id, String actor) {
        var policy = require(id);
        if (policy.getBody().isBlank()) {
            throw new BadRequestException("A policy cannot be published with an empty body.");
        }
        policy.publish(actor);
        return PolicyResponse.from(policies.save(policy));
    }

    @Transactional
    public PolicyResponse unpublish(Long id, String actor) {
        var policy = require(id);
        policy.unpublish(actor);
        return PolicyResponse.from(policies.save(policy));
    }

    /**
     * Records a new account's consent.
     *
     * <p>Every policy marked required must be in {@code acceptedKinds}. Checked server-side
     * because a tick box in a browser is a courtesy, not evidence — and this record is the
     * only thing that can later show what somebody actually agreed to.
     */
    @Transactional
    public void recordSignupAcceptance(Long customerId, Set<PolicyKind> acceptedKinds, String clientHash) {
        var required = policies.findRequiredAtSignup();

        var missing = required.stream()
                .map(Policy::getKind)
                .filter(kind -> !acceptedKinds.contains(kind))
                .toList();
        if (!missing.isEmpty()) {
            throw new BadRequestException("You must accept: "
                    + missing.stream().map(PolicyService::readable).toList());
        }

        // Anything else the visitor ticked (an optional policy) is recorded too.
        policies.findPublished().stream()
                .filter(policy -> acceptedKinds.contains(policy.getKind()))
                .forEach(policy -> acceptances.save(new PolicyAcceptance(customerId, policy, clientHash)));
    }

    @Transactional(readOnly = true)
    public List<PolicyAcceptance> acceptancesFor(Long customerId) {
        return acceptances.findByCustomerIdOrderByAcceptedAtDesc(customerId);
    }

    private Policy require(Long id) {
        return policies.findById(id).orElseThrow(() -> new NotFoundException("Policy " + id + " not found"));
    }

    private static String readable(PolicyKind kind) {
        return kind.name().charAt(0) + kind.name().substring(1).toLowerCase().replace('_', ' ');
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }
}
