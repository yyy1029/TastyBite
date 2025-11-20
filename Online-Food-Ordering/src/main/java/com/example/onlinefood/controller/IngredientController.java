package com.example.onlinefood.controller;


import com.example.onlinefood.model.IngredientCategory;
import com.example.onlinefood.model.IngredientItem;
import com.example.onlinefood.request.IngredientCategoryRequest;
import com.example.onlinefood.request.IngredientRequest;
import com.example.onlinefood.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredient")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(@RequestBody IngredientCategoryRequest request,
                                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        //Check if a category with the same name already exists in the database
        IngredientCategory existingCategory = ingredientService.findCategoryByName(request.getName());

        if (existingCategory != null) {
            //If a category with the same name exists, return the wrong ResponseEntity
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        }
       
        IngredientCategory item = ingredientService.createIngredientCategory(request.getName());
        return new ResponseEntity<>(item, HttpStatus.CREATED);

    }

    @PostMapping("/create")
    public ResponseEntity<IngredientItem> createIngredientItem(@RequestBody IngredientRequest request,
                                                               @RequestHeader("Authorization") String jwt) throws Exception {

        IngredientItem existingIngredient = ingredientService.findingredientByName(request.getName());

        if (existingIngredient != null) {
            //If a category with the same name exists, return the wrong ResponseEntity
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); 

        }

        IngredientItem item = ingredientService.createIngredientItem(request.getName(),request.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);

    }

    @PutMapping("/{id}/stoke") //Update ingredient inventory
    public ResponseEntity<IngredientItem> updateIngredientStock(@PathVariable Long id) throws Exception {

        IngredientItem item = ingredientService.updateStock(id);

        return new ResponseEntity<>(item, HttpStatus.CREATED);

    }

    @GetMapping("/{id}") //get an ingredient
    public ResponseEntity<IngredientItem> getIngredient(@PathVariable Long id) throws Exception {

        IngredientItem item = ingredientService.findIngredientById(id);

        return new ResponseEntity<>(item, HttpStatus.OK);

    }

   @GetMapping("/{id}/category") //Get the category to which an ingredient belongs
   public ResponseEntity<IngredientCategory> getIngredientCategory(@PathVariable Long id) throws Exception {

       IngredientCategory category = ingredientService.findIngredientCategoryById(id);

       return new ResponseEntity<>(category, HttpStatus.OK);

   }

    @GetMapping("/all")
    public ResponseEntity<List<IngredientItem>> getAllIngredient() throws Exception {

        List<IngredientItem> ingredients = ingredientService.findAllIngredients();

        return new ResponseEntity<>(ingredients, HttpStatus.OK);

    }

    @GetMapping("/categories")
    public ResponseEntity<List<IngredientCategory>> getAllIngredientCategories() throws Exception {

        List<IngredientCategory> categories = ingredientService.findAllIngredientCategories();

        return new ResponseEntity<>(categories, HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id, 
                                                 @RequestHeader("Authorization") String jwt) {

        try {
            //Verify that the ID exists
            if (!ingredientService.existsCategoryById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category with id " + id + " not found.");

            }
            //Perform the delete operation
            ingredientService.deleteCategoryById(id);
            return ResponseEntity.ok("Category deleted successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete category.");

        }

    }

    @DeleteMapping("/delete/item/{itemId}")
    public ResponseEntity<String> deleteItem(@PathVariable Long itemId, 
                                             @RequestHeader("Authorization") String jwt) {

        try {
            //Call the IngredientService's delete item method.
            ingredientService.deleteItemById(itemId);
            return ResponseEntity.ok("Item deleted successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete item.");

        }

    }

    @PutMapping("/category/{categoryId}")
public ResponseEntity<IngredientCategory> updateIngredientCategory(@PathVariable Long categoryId, 
                                                                   @RequestBody IngredientCategoryRequest request) {

    IngredientCategory existingCategory = ingredientService.findCategoryByName(request.getName());

    if (existingCategory != null) {
        //If a category with the same name exists, return the wrong ResponseEntity.
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    
    try {
        IngredientCategory updatedCategory = ingredientService.updateIngredientCategory(categoryId, request.getName());

        if (updatedCategory != null) {
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }

}

    @GetMapping("/category/{ingredientItemId}")
    public ResponseEntity<?> getCategoryByIngredientItemId(@PathVariable Long ingredientItemId) {

        try {
            IngredientCategory category = ingredientService.findCategoryByIngredientItemId(ingredientItemId);
            return ResponseEntity.ok(category);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }
        
    }

}
