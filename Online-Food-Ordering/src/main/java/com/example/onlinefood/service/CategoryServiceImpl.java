package com.example.onlinefood.service;

import com.example.onlinefood.model.Category;
import com.example.onlinefood.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public Category createCategory(String name) {

        Category category = new Category();

        category.setName(name);

        return categoryRepo.save(category);

    }

    @Override
    public Category findCategoryById(Long id) throws Exception {

        Optional<Category> optionalCategory = categoryRepo.findById(id);

        if(optionalCategory.isEmpty()){
            throw new Exception("Category is not found");
        }

        return optionalCategory.get();

    }

    @Override
    public List<Category> findAllCategory() {

        return categoryRepo.findAll();

    }

    @Override
    public void deleteCategoryById(Long id) {

        categoryRepo.deleteById(id);

    }

    @Override
    public Category saveCategory(Category category) {

        return categoryRepo.save(category);

    }

    @Override
    public Category findCategoryByName(String name) {

        return categoryRepo.findByName(name);
        
    }

}

