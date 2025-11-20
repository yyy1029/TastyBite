package com.example.onlinefood.controller;


import com.example.onlinefood.model.MealDeal;
import com.example.onlinefood.service.MealDealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mealDeal")
public class MealDealController {
    @Autowired
    private MealDealService mealDealService;

    @PostMapping
    public ResponseEntity<List<MealDeal>> searchMealDeal(@RequestParam String name,
                                                         @RequestHeader("Authorization")String jwt) throws Exception {

        List<MealDeal> mealDeals = mealDealService.searchMealDeal(name);

        return new ResponseEntity<>(mealDeals, HttpStatus.CREATED);

    }

    @GetMapping("/{mealDealId}/totalPrice")
    public ResponseEntity<Long> calculateTotalPrice(@PathVariable Long mealDealId) {

        try {
            MealDeal mealDeal = mealDealService.findMealDealById(mealDealId);

            Long totalPrice = mealDealService.calculateTotalPrice(mealDeal);

            return ResponseEntity.ok(totalPrice);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

        }

    }

}
