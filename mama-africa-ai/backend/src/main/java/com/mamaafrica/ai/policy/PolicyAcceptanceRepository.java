package com.mamaafrica.ai.policy;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PolicyAcceptanceRepository extends JpaRepository<PolicyAcceptance, Long> {

    List<PolicyAcceptance> findByCustomerIdOrderByAcceptedAtDesc(Long customerId);
}
