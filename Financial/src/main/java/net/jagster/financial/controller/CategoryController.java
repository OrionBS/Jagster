package net.jagster.financial.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.jagster.financial.dto.request.CategoryRequest;
import net.jagster.financial.dto.response.CategoryResponse;
import net.jagster.financial.service.impl.CategoryServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryServiceImpl categoryService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryResponse> getCategories() {
        return categoryService.getCategories();
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse postCategory(@Valid @RequestBody CategoryRequest categoryRequest) {
        return categoryService.postCategory(categoryRequest);
    }

    @GetMapping(path = "/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public CategoryResponse getCategoryById(@PathVariable Long categoryId) {
        return categoryService.getCategoryById(categoryId);
    }

    @PutMapping(path = "/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public CategoryResponse putCategoryById(@PathVariable Long categoryId, @Valid @RequestBody CategoryRequest categoryRequest) {
        return categoryService.putCategoryById(categoryId,categoryRequest);
    }

    @DeleteMapping(path = "/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCategoryById(@PathVariable Long categoryId) {
        categoryService.deleteById(categoryId);
    }

}
