package net.jagster.financial.service;

import net.jagster.financial.entity.Category;
import net.jagster.financial.dto.request.CategoryRequest;
import net.jagster.financial.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<Category> findCategories();

    List<CategoryResponse> getCategories();

    Category findCategoryById(Long categoryId);

    CategoryResponse getCategoryById(Long categoryId);

    CategoryResponse postCategory(CategoryRequest categoryRequest);

    CategoryResponse putCategoryById(Long categoryId, CategoryRequest categoryRequest);

    void deleteById(Long categoryId);

    Category insertCategory(CategoryRequest categoryRequest);

    Category updateCategoryById(Long categoryId, CategoryRequest categoryRequest);
}
