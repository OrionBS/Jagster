package net.jagster.financial.service.impl;

import lombok.RequiredArgsConstructor;
import net.jagster.financial.entity.Category;
import net.jagster.financial.exception.ConflictCategoryException;
import net.jagster.financial.exception.UnknownCategoryException;
import net.jagster.financial.mapper.CategoryMapper;
import net.jagster.financial.dto.request.CategoryRequest;
import net.jagster.financial.dto.response.CategoryResponse;
import net.jagster.financial.repository.CategoryRepository;
import net.jagster.financial.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public List<CategoryResponse> getCategories() {
        return findCategories()
                .stream()
                .map(CategoryMapper::toCategoryResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<Category> findCategories() {
        return categoryRepository.findAll();
    }

    @Override
    @Transactional
    public CategoryResponse getCategoryById(Long categoryId) {
        return CategoryMapper.toCategoryResponse(findCategoryById(categoryId));
    }

    @Override
    public Category findCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() -> {
            throw new UnknownCategoryException();
        });
    }

    @Override
    @Transactional
    public CategoryResponse postCategory(CategoryRequest categoryRequest) {
        return CategoryMapper.toCategoryResponse(insertCategory(categoryRequest));
    }

    @Override
    public Category insertCategory(CategoryRequest categoryRequest) {
        categoryRepository.findCategoryByNameIgnoreCase(categoryRequest.getName()).ifPresent(category -> {
            throw new ConflictCategoryException();
        });

        Category category = new Category();
        category.setName(categoryRequest.getName());
        category.setIcon(categoryRequest.getIcon());
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public CategoryResponse putCategoryById(Long categoryId, CategoryRequest categoryRequest) {
        return CategoryMapper.toCategoryResponse(this.updateCategoryById(categoryId, categoryRequest));
    }

    @Override
    public Category updateCategoryById(Long categoryId, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> {
            throw new UnknownCategoryException();
        });
        category.setName(categoryRequest.getName());
        category.setIcon(categoryRequest.getIcon());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> {
            throw new UnknownCategoryException();
        });
        categoryRepository.delete(category);
    }

}
