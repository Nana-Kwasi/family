package com.mamaafrica.ai.knowledge;

import com.mamaafrica.ai.IntegrationTest;
import dev.langchain4j.data.segment.TextSegment;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class KnowledgeApiTest extends IntegrationTest {

    private static final String ARTICLE = """
            Sankofa is an Adinkra symbol from the Akan people of Ghana. The word means
            "go back and get it" and teaches that it is not wrong to retrieve what has been
            forgotten. Gye Nyame means "except for God" and expresses the supremacy of God.
            Adinkra symbols are printed on cloth for funerals, festivals and celebrations,
            and each one carries a proverb that elders use to teach the young.
            """;

    @Autowired
    private KnowledgeDocumentRepository documents;

    @Autowired
    private KnowledgeIndexer indexer;

    @Test
    void uploadsExtractsAndIndexesAMarkdownDocument() throws Exception {
        var token = adminToken();
        var id = upload(token, "adinkra.md", ARTICLE, null);

        var stored = documents.findById(id).orElseThrow();
        assertThat(stored.getContent()).contains("Sankofa");
        assertThat(stored.getStatus()).isEqualTo(DocumentStatus.PENDING);

        // The listener runs after commit, which a rolled-back test never reaches — so index inline.
        indexer.index(id);

        var indexed = documents.findById(id).orElseThrow();
        assertThat(indexed.getStatus()).isEqualTo(DocumentStatus.INDEXED);
        assertThat(indexed.getChunkCount()).isPositive();

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<TextSegment>> captor = ArgumentCaptor.forClass(List.class);
        verify(embeddingStore).addAll(anyList(), captor.capture());

        var segments = captor.getValue();
        assertThat(segments).isNotEmpty();
        assertThat(segments.getFirst().metadata().getString(KnowledgeIndexer.DOCUMENT_ID_KEY))
                .isEqualTo(id.toString());
        assertThat(segments.getFirst().metadata().getString(KnowledgeIndexer.TITLE_KEY))
                .isEqualTo("Adinkra symbols");
    }

    @Test
    void categorisesDocumentsAndTagsTheirChunks() throws Exception {
        var token = adminToken();
        mockMvc.perform(post("/api/categories")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Culture","description":"Traditions and symbols"}"""))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.slug").value("culture"));

        var id = upload(token, "adinkra.txt", ARTICLE, "culture");
        indexer.index(id);

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<TextSegment>> captor = ArgumentCaptor.forClass(List.class);
        verify(embeddingStore).addAll(anyList(), captor.capture());

        assertThat(captor.getValue().getFirst().metadata().getString(KnowledgeIndexer.CATEGORY_KEY))
                .isEqualTo("culture");
    }

    @Test
    void rejectsUnsupportedFileTypes() throws Exception {
        var file = new MockMultipartFile("file", "notes.xlsx",
                "application/vnd.ms-excel", "binary".getBytes(StandardCharsets.UTF_8));

        mockMvc.perform(multipart("/api/knowledge").file(file).header("Authorization", adminToken()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("Unsupported file type")));
    }

    @Test
    void rejectsAFileWithNoReadableText() throws Exception {
        var file = new MockMultipartFile("file", "empty.txt", "text/plain", "   ".getBytes(StandardCharsets.UTF_8));

        mockMvc.perform(multipart("/api/knowledge").file(file).header("Authorization", adminToken()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deletingADocumentAlsoRemovesItsVectors() throws Exception {
        var token = adminToken();
        var id = upload(token, "adinkra.txt", ARTICLE, null);

        mockMvc.perform(delete("/api/knowledge/{id}", id).header("Authorization", token))
                .andExpect(status().isNoContent());

        assertThat(documents.findById(id)).isEmpty();
        verify(embeddingStore).removeAll(org.mockito.ArgumentMatchers
                .any(dev.langchain4j.store.embedding.filter.Filter.class));
    }

    @Test
    void listsAndSearchesDocumentsByTitle() throws Exception {
        var token = adminToken();
        upload(token, "adinkra.txt", ARTICLE, null);

        mockMvc.perform(get("/api/knowledge").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].title").value("Adinkra symbols"));

        mockMvc.perform(get("/api/knowledge").param("query", "adinkra").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1));

        mockMvc.perform(get("/api/knowledge").param("query", "no-such-document").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(0));
    }

    private UUID upload(String token, String fileName, String content, String categorySlug) throws Exception {
        var file = new MockMultipartFile("file", fileName, "text/plain", content.getBytes(StandardCharsets.UTF_8));
        var request = multipart("/api/knowledge")
                .file(file)
                .param("title", "Adinkra symbols")
                .header("Authorization", token);
        if (categorySlug != null) {
            request = request.param("categorySlug", categorySlug);
        }

        var response = mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        return UUID.fromString(objectMapper.readTree(response).get("id").asText());
    }
}
