package com.example.onlinefood.service;

import com.example.onlinefood.model.Category;

import java.util.List;

public interface CategoryService {

    public Category createCategory(String name);

    public Category findCategoryById(Long id) throws Exception;

    public List<Category> findAllCategory();

    public void deleteCategoryById(Long id);

    Category saveCategory(Category category);

    public Category findCategoryByName(String categoryName);
    
}
