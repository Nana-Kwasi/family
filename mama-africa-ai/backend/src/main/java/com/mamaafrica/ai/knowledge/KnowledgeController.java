package com.mamaafrica.ai.knowledge;

import com.mamaafrica.ai.knowledge.dto.KnowledgeDocumentDetail;
import com.mamaafrica.ai.knowledge.dto.KnowledgeDocumentResponse;
import com.mamaafrica.ai.knowledge.dto.KnowledgeSearchResult;
import com.mamaafrica.ai.knowledge.dto.UpdateDocumentRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

/** Admin-only knowledge base management. */
@RestController
@RequestMapping("/api/knowledge")
@Tag(name = "Knowledge Base")
public class KnowledgeController {

    private final KnowledgeService knowledgeService;
    private final KnowledgeRetriever retriever;

    public KnowledgeController(KnowledgeService knowledgeService, KnowledgeRetriever retriever) {
        this.knowledgeService = knowledgeService;
        this.retriever = retriever;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload a PDF, DOCX, TXT or Markdown document and index it")
    public ResponseEntity<KnowledgeDocumentResponse> upload(
            @RequestPart("file") MultipartFile file,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String categorySlug,
            @AuthenticationPrincipal UserDetails principal) {

        var uploader = principal == null ? null : principal.getUsername();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(knowledgeService.upload(file, title, categorySlug, uploader));
    }

    @GetMapping
    @Operation(summary = "List documents, optionally filtered by title and category")
    public ResponseEntity<Page<KnowledgeDocumentResponse>> list(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Long categoryId,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(knowledgeService.list(query, categoryId, pageable));
    }

    @GetMapping("/search")
    @Operation(summary = "Semantic search across indexed chunks")
    public ResponseEntity<List<KnowledgeSearchResult>> search(
            @RequestParam String query,
            @RequestParam(required = false) String categorySlug,
            @RequestParam(defaultValue = "10") int maxResults) {
        return ResponseEntity.ok(retriever.searchDocuments(query, categorySlug, maxResults));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Document metadata plus the extracted text")
    public ResponseEntity<KnowledgeDocumentDetail> get(@PathVariable UUID id) {
        return ResponseEntity.ok(knowledgeService.get(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Rename or re-categorise a document (triggers re-indexing)")
    public ResponseEntity<KnowledgeDocumentResponse> update(@PathVariable UUID id,
                                                            @Valid @RequestBody UpdateDocumentRequest request) {
        return ResponseEntity.ok(knowledgeService.update(id, request));
    }

    @PostMapping("/{id}/reindex")
    @Operation(summary = "Re-chunk and re-embed one document")
    public ResponseEntity<Void> reindex(@PathVariable UUID id) {
        knowledgeService.reindex(id);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/reindex")
    @Operation(summary = "Re-index every document — use after changing chunking or the embedding model")
    public ResponseEntity<Map<String, Integer>> reindexAll() {
        return ResponseEntity.accepted().body(Map.of("queued", knowledgeService.reindexAll()));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a document and its vectors")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        knowledgeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
