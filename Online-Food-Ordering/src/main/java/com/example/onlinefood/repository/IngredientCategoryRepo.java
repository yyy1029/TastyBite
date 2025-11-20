package com.example.onlinefood.repository;

import com.example.onlinefood.model.IngredientCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientCategoryRepo extends JpaRepository<IngredientCategory,Long> {

    IngredientCategory findByName(String name);
    
}
