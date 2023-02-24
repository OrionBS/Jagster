package net.jagster.financial.mapper;

import net.jagster.financial.entity.Category;
import net.jagster.financial.dto.response.CategoryResponse;
import net.jagster.financial.entity.Transaction;

import java.util.stream.Collectors;

public class CategoryMapper {
    public static CategoryResponse toCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .icon(category.getIcon())
                .build();
    }
}
