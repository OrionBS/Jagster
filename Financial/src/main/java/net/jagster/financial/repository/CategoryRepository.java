package net.jagster.financial.repository;



import net.jagster.financial.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Boolean existsCategoryByName(String name);

    Optional<Category> findCategoryByNameIgnoreCase(String name);
}
