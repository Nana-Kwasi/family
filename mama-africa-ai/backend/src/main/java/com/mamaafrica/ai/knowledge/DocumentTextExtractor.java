package com.mamaafrica.ai.knowledge;

import com.mamaafrica.ai.common.BadRequestException;
import dev.langchain4j.data.document.parser.apache.pdfbox.ApachePdfBoxDocumentParser;
import dev.langchain4j.data.document.parser.apache.poi.ApachePoiDocumentParser;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Set;

/**
 * Turns an uploaded file into plain text. Dispatches on file extension rather than the
 * browser-supplied content type, which is unreliable for DOCX and Markdown.
 */
@Component
public class DocumentTextExtractor {

    private static final Set<String> SUPPORTED = Set.of("pdf", "docx", "doc", "txt", "md", "markdown");

    public String extract(MultipartFile file) {
        var extension = extensionOf(file.getOriginalFilename());
        if (!SUPPORTED.contains(extension)) {
            throw new BadRequestException(
                    "Unsupported file type '%s'. Supported: PDF, DOCX, TXT, Markdown.".formatted(extension));
        }

        String text;
        try (InputStream in = file.getInputStream()) {
            text = switch (extension) {
                case "pdf" -> new ApachePdfBoxDocumentParser().parse(in).text();
                case "docx", "doc" -> new ApachePoiDocumentParser().parse(in).text();
                default -> new String(in.readAllBytes(), StandardCharsets.UTF_8);
            };
        } catch (IOException e) {
            throw new BadRequestException("Could not read the uploaded file: " + e.getMessage());
        } catch (RuntimeException e) {
            throw new BadRequestException("Could not parse the document: " + e.getMessage());
        }

        if (text == null || text.isBlank()) {
            throw new BadRequestException("No readable text found in the document. Scanned PDFs need OCR first.");
        }
        return text;
    }

    public String extensionOf(String fileName) {
        if (fileName == null) {
            return "";
        }
        var dot = fileName.lastIndexOf('.');
        return dot < 0 ? "" : fileName.substring(dot + 1).toLowerCase(Locale.ROOT);
    }
}
