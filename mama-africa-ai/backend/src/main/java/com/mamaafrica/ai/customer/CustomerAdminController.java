package com.mamaafrica.ai.customer;

import com.mamaafrica.ai.customer.dto.CustomerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Website accounts, seen from the console. Read-only: an operator has no business editing
 * someone's profile, and the destructive actions a support case actually needs — disabling an
 * account — are not built until there is a reason for them.
 */
@RestController
@RequestMapping("/api/customers")
@Tag(name = "Customers (admin)")
public class CustomerAdminController {

    private final CustomerRepository customers;

    public CustomerAdminController(CustomerRepository customers) {
        this.customers = customers;
    }

    @GetMapping
    @Operation(summary = "List website accounts, newest first")
    public ResponseEntity<Page<CustomerResponse>> list(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok(customers
                .findAllByOrderByCreatedAtDesc(PageRequest.of(Math.max(page, 0), Math.clamp(size, 1, 200)))
                .map(CustomerResponse::from));
    }
}
