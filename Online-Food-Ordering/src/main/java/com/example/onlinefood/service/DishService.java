package com.example.onlinefood.service;

import com.example.onlinefood.model.Category;
import com.example.onlinefood.model.Dish;
import com.example.onlinefood.request.CreateDishRequest;
import com.example.onlinefood.request.UpdateDishRequest;

import java.util.List;
import java.util.Map;

public interface DishService {

    public Dish createDish(CreateDishRequest request, Category category);

    void deleteDish(Long DishId) throws Exception;

     List<Dish> searchDish(String keyword);

     public Dish findDishById(Long DishId) throws Exception;

     public Dish updateAvailabilityStatus(Long DishId) throws Exception;

     public List<Dish> filterByCateGory(List<Dish> dishes,String dishCategory);

    public Dish likeDish(Long dishId);

    public Dish deleteLike(Long dishId);

    public Dish updateDish(Long dishId, UpdateDishRequest updateDishRequest) throws Exception;

    public List<Dish> getAllDishes();

    public List<Map<String, Object>> getIngredientItemsByDishId(Long dishId);
    
}

