package com.example.onlinefood.service;

import com.example.onlinefood.model.IngredientCategory;
import com.example.onlinefood.model.IngredientItem;
import com.example.onlinefood.repository.IngredientCategoryRepo;
import com.example.onlinefood.repository.IngredientItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class IngredientServiceImpl implements IngredientService{

    @Autowired
    private IngredientItemRepo ingredientItemRepo;

    @Autowired
    private IngredientCategoryRepo ingredientCategoryRepo;

    @Override
    public IngredientCategory createIngredientCategory(String name) throws Exception {

        IngredientCategory category = new IngredientCategory();

        category.setName(name);

        return ingredientCategoryRepo.save(category);

    }

    @Override//ingredient category id
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {

        Optional<IngredientCategory> opt = ingredientCategoryRepo.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Ingredient category is not found");
        }

        return opt.get();

    }

    @Override
    public IngredientCategory findCategoryByIngredientItemId(Long ingredientItemId) throws Exception {

        IngredientItem ingredientItem = ingredientItemRepo.findById(ingredientItemId)
                .orElseThrow(() -> new Exception("Ingredient item not found"));

        //Get the IngredientCategory to which the IngredientItem belongs.
        IngredientCategory category = ingredientItem.getCategory();

        if (category == null) {
            throw new Exception("Category not found for ingredient item");
        }

        return category;

    }

    @Override
    public IngredientItem createIngredientItem(String ingredientName, Long categoryId) throws Exception {

        IngredientItem item = new IngredientItem();
        IngredientCategory category = findIngredientCategoryById(categoryId);
        item.setName(ingredientName);
        item.setCategory(category);

        IngredientItem ingredient = ingredientItemRepo.save(item);
        category.getIngredients().add(ingredient);

        return ingredient;

    }

    @Override
    public IngredientItem updateStock(Long id) throws Exception {

        //Find ingredient in the database first.
        Optional<IngredientItem> optionalIngredientItem = ingredientItemRepo.findById(id);

        if(optionalIngredientItem.isEmpty()){
            throw new Exception("Ingredient is not found");
        }

        //The inverse is for updating the stock status. Click on available to set in stock or out of stock

        IngredientItem ingredientItem = optionalIngredientItem.get();
        ingredientItem.setStoke(!ingredientItem.isStoke());

        return ingredientItemRepo.save(ingredientItem);

    }

    @Override
    public IngredientItem findIngredientById(Long id) throws Exception {

        Optional<IngredientItem> optionalIngredientItem = ingredientItemRepo.findById(id);

        if(optionalIngredientItem.isEmpty()){
            throw new Exception("Ingredient is nor found");
        }

        return optionalIngredientItem.get();

    }

    @Override
    public List<IngredientItem> findAllIngredients() {

        return ingredientItemRepo.findAll();

    }

    @Override
    public List<IngredientCategory> findAllIngredientCategories() {

        return ingredientCategoryRepo.findAll();

    }

    @Override
    public void deleteCategoryById(Long id) {

        ingredientCategoryRepo.deleteById(id);

    }

    public void deleteItemById(Long itemId) {

        //Query the database for an item based on the item's ID.
        Optional<IngredientItem> optionalItem = ingredientItemRepo.findById(itemId);

        //If the corresponding item is found, delete it.
        optionalItem.ifPresent(item -> {
            ingredientItemRepo.delete(item);
        });

        if (!optionalItem.isPresent()) {
            throw new NoSuchElementException("Item not found with id: " + itemId);

        }

    }

        @Override
        public boolean existsCategoryById(Long id) {

            return ingredientCategoryRepo.existsById(id);

        }

        @Override
        public IngredientCategory updateIngredientCategory(Long categoryId, String newName) {

           // Retrieve category by categoryId
           Optional<IngredientCategory> optionalCategory = ingredientCategoryRepo.findById(categoryId);
           
               IngredientCategory category = optionalCategory.get();

               category.setName(newName);

               // Perform update operation, like saving to database
               // Return the updated category
               return ingredientCategoryRepo.save(category);

           }
       
            @Override
           public IngredientCategory findCategoryByName(String name) {

               return ingredientCategoryRepo.findByName(name);

           }
       
           @Override
           public IngredientItem findingredientByName(String name) {

               return ingredientItemRepo.findByName(name);
               
           }



    }
