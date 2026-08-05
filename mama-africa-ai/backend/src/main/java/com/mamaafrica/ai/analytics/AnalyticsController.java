package com.mamaafrica.ai.analytics;

import com.mamaafrica.ai.analytics.dto.AnalyticsResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@Validated
@Tag(name = "Analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping
    @Operation(summary = "Usage, language mix, latency and knowledge-base breakdowns")
    public ResponseEntity<AnalyticsResponse> analytics(
            @RequestParam(defaultValue = "30") @Min(1) @Max(365) int days) {
        return ResponseEntity.ok(analyticsService.forWindow(days));
    }
}
