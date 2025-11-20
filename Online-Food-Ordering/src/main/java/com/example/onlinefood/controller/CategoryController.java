package com.example.onlinefood.controller;


import com.example.onlinefood.model.Category;
import com.example.onlinefood.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/api/category")
    public ResponseEntity<Category> categoryResponseEntity(@RequestBody Category category,
                                                           @RequestHeader("Authorization") String jwt) throws Exception {

        Category existingCategory = categoryService.findCategoryByName(category.getName());

        if (existingCategory != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);//Here you can return specific error messages as required

        }
        Category createdCategory = categoryService.createCategory(category.getName());

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);

    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getCategory() {

        List<Category> categories = categoryService.findAllCategory();

        return new ResponseEntity<>(categories, HttpStatus.CREATED);

    }

    @DeleteMapping("/category/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id,
                                                 @RequestHeader("Authorization")String jwt) {

        try {
            categoryService.deleteCategoryById(id);

            return ResponseEntity.ok("Category deleted successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete category.");

        }

    }

    @PutMapping("/category/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long categoryId, 
                                                   @RequestBody Category updatedCategory,
                                                   @RequestHeader("Authorization") String jwt) throws Exception {

        //Find the category to be updated in the database
        Category existingCategory = categoryService.findCategoryById(categoryId);

        if (existingCategory == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            
        }

        existingCategory.setName(updatedCategory.getName());

        Category savedCategory = categoryService.saveCategory(existingCategory);

        return new ResponseEntity<>(savedCategory, HttpStatus.OK);

    }

}
