package com.mamaafrica.ai.culture;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {

    Optional<Subscriber> findByEmailIgnoreCase(String email);

    Page<Subscriber> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
