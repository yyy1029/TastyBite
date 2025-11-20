package com.example.onlinefood.repository;


import com.example.onlinefood.model.MealDeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MealDealRepo extends JpaRepository<MealDeal,Long> {

    //Use keywords to implement lookup functions
    @Query("SELECT f FROM Dish f WHERE f.name LIKE %:keyword% OR f.dishCategory.name LIKE %:keyword%")
    List<MealDeal> searchMealDealBy(@Param("keyword") String keyword);

    MealDeal findMealDealByName(String name);

}