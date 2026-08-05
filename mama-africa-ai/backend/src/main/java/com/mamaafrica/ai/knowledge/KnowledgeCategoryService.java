package com.mamaafrica.ai.knowledge;

import com.mamaafrica.ai.common.BadRequestException;
import com.mamaafrica.ai.common.NotFoundException;
import com.mamaafrica.ai.knowledge.dto.CategoryRequest;
import com.mamaafrica.ai.knowledge.dto.CategoryResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class KnowledgeCategoryService {

    private final KnowledgeCategoryRepository categories;

    public KnowledgeCategoryService(KnowledgeCategoryRepository categories) {
        this.categories = categories;
    }

    public List<CategoryResponse> list() {
        return categories.findAllByOrderByNameAsc().stream().map(CategoryResponse::from).toList();
    }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        requireUniqueSlug(KnowledgeCategory.toSlug(request.name()));
        var category = categories.save(new KnowledgeCategory(request.name().trim(), request.description()));
        return CategoryResponse.from(category);
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request) {
        var category = categories.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found: " + id));

        var newSlug = KnowledgeCategory.toSlug(request.name());
        if (!newSlug.equals(category.getSlug())) {
            requireUniqueSlug(newSlug);
        }

        category.rename(request.name().trim(), request.description());
        return CategoryResponse.from(categories.save(category));
    }

    /** Documents keep their rows; the foreign key is set to null by the database. */
    @Transactional
    public void delete(Long id) {
        if (!categories.existsById(id)) {
            throw new NotFoundException("Category not found: " + id);
        }
        categories.deleteById(id);
    }

    private void requireUniqueSlug(String slug) {
        if (categories.existsBySlug(slug)) {
            throw new BadRequestException("A category with that name already exists");
        }
    }
}
