package com.example.onlinefood.repository;

import com.example.onlinefood.model.IngredientItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientItemRepo extends JpaRepository<IngredientItem,Long> {

    IngredientItem findByName(String name);

    List<IngredientItem> findByCategoryId(Long id);
    
}
