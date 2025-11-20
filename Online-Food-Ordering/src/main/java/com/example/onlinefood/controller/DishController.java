package com.example.onlinefood.controller;


import com.example.onlinefood.model.Dish;
import com.example.onlinefood.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dish")
public class DishController {
    @Autowired
    private DishService dishService;

    @PostMapping
    public ResponseEntity<List<Dish>> searchDish(@RequestParam String name,
                                                 @RequestHeader("Authorization")String jwt) throws Exception {

        List<Dish> dishes = dishService.searchDish(name);

        return new ResponseEntity<>(dishes, HttpStatus.CREATED);

    }

    @PutMapping("/{dishId}/like")
    public Dish likeDish(@PathVariable Long dishId) {

        return dishService.likeDish(dishId);

    }

    @DeleteMapping("/{dishId}/like")
    public Dish deleteLike(@PathVariable Long dishId) {

        return dishService.deleteLike(dishId);

    }

    @GetMapping("/IngredientsMap/{dishId}")
    public ResponseEntity<?> getIngredientItemsByDishId(@PathVariable Long dishId) {

        if (dishId == null) {
            return ResponseEntity.badRequest().body("The dishId must not be null");
            
        }

        List<Map<String, Object>> result = dishService.getIngredientItemsByDishId(dishId);

        return ResponseEntity.ok(result);

    }

}

