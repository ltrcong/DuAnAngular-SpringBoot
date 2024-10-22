package com.project.shopapple.services.category;

import com.project.shopapple.entities.Category;
import com.project.shopapple.models.CategoryDTO;

import java.util.List;

public interface ICategoryService {
    Category createCategory(CategoryDTO categoryDTO);

    Category  getCategoryById(Long id);

    List<Category> getAllCategories();

    Category updateCategory(Long id, CategoryDTO categoryDTO);

    void deleteCategory(Long id);
}
