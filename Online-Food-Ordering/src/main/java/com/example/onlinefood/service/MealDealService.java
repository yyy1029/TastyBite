package com.example.onlinefood.service;

import com.example.onlinefood.model.Dish;
import com.example.onlinefood.model.MealDeal;
import com.example.onlinefood.request.CreateMealDealRequest;
import com.example.onlinefood.request.UpdateMealDealRequest;

import java.util.List;

public interface MealDealService {

    MealDeal createMealDeal(CreateMealDealRequest request, List<Dish> dishes);

    void deleteMealDeal(Long mealDealId) throws Exception;

    List<MealDeal> searchMealDeal(String keyword);

    MealDeal findMealDealById(Long mealDealId) throws Exception;

    MealDeal getMealDealById(Long id);

    Long calculateTotalPrice(MealDeal mealDeal);

    MealDeal updateMealDeal(Long mealDealId, UpdateMealDealRequest request) throws Exception;

    List<MealDeal> getAllMealDeals();

    MealDeal findMealDealByName(String name);
    
}
