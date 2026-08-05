package com.mamaafrica.ai.settings;

import com.mamaafrica.ai.config.EmbeddingProperties;
import com.mamaafrica.ai.config.AiProperties;
import com.mamaafrica.ai.config.QdrantProperties;
import com.mamaafrica.ai.settings.dto.SettingsResponse;
import com.mamaafrica.ai.settings.dto.UpdateSettingsRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
@Tag(name = "AI Settings")
public class SettingsController {

    private final SettingsService settingsService;
    private final AiProperties aiProperties;
    private final EmbeddingProperties embeddingProperties;
    private final QdrantProperties qdrantProperties;

    public SettingsController(SettingsService settingsService, AiProperties aiProperties,
                              EmbeddingProperties embeddingProperties, QdrantProperties qdrantProperties) {
        this.settingsService = settingsService;
        this.aiProperties = aiProperties;
        this.embeddingProperties = embeddingProperties;
        this.qdrantProperties = qdrantProperties;
    }

    @GetMapping
    @Operation(summary = "Current AI configuration")
    public ResponseEntity<SettingsResponse> get() {
        return ResponseEntity.ok(build(settingsService.effective()));
    }

    @PutMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Update the AI configuration — takes effect on the next request")
    public ResponseEntity<SettingsResponse> update(@Valid @RequestBody UpdateSettingsRequest request,
                                                   @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(build(settingsService.update(request, principal.getUsername())));
    }

    @PostMapping("/reset")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Discard stored settings and go back to the environment variables")
    public ResponseEntity<SettingsResponse> reset(@AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(build(settingsService.resetToEnvironment(principal.getUsername())));
    }

    private SettingsResponse build(EffectiveSettings settings) {
        var context = new SettingsResponse.ReadOnlyContext(
                aiProperties.timeout().toSeconds(),
                embeddingProperties.provider().name(),
                embeddingProperties.provider() == EmbeddingProperties.Provider.IN_PROCESS
                        ? "all-MiniLM-L6-v2" : embeddingProperties.model(),
                qdrantProperties.collection());
        return SettingsResponse.of(settings, settingsService.stored(), context);
    }
}
