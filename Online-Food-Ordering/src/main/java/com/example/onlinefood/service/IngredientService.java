package com.example.onlinefood.service;

import com.example.onlinefood.model.IngredientCategory;
import com.example.onlinefood.model.IngredientItem;

import java.util.List;

public interface IngredientService {

    public IngredientCategory createIngredientCategory(String name) throws Exception;

    public IngredientCategory findIngredientCategoryById(Long id) throws Exception;

    public IngredientItem createIngredientItem(String ingredientName, Long categoryId) throws Exception;

    public IngredientItem updateStock(Long id) throws Exception;

    public IngredientItem findIngredientById(Long id) throws Exception;

    public List<IngredientItem> findAllIngredients();

    public List<IngredientCategory> findAllIngredientCategories();

    public void deleteCategoryById(Long id);

    public void deleteItemById(Long itemId);

    public boolean existsCategoryById(Long id);

    public IngredientCategory findCategoryByIngredientItemId(Long ingredientItemId) throws Exception;

    public IngredientCategory updateIngredientCategory(Long categoryId, String newName);

    public IngredientCategory findCategoryByName(String categoryName);
  
    public IngredientItem findingredientByName(String name);

}
