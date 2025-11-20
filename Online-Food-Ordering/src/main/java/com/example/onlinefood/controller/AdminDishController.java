package com.example.onlinefood.controller;

import com.example.onlinefood.model.Dish;
import com.example.onlinefood.request.CreateDishRequest;
import com.example.onlinefood.request.UpdateDishRequest;
import com.example.onlinefood.response.MessageResponse;
import com.example.onlinefood.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/dish")
public class AdminDishController {

    @Autowired
    private DishService dishService;

    @PostMapping("/create")
    public ResponseEntity<Dish> createDish(@RequestBody CreateDishRequest request) throws Exception {
        Dish dish = dishService.createDish(request,request.getCategory());

        return new ResponseEntity<>(dish, HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteDish(@PathVariable Long id) throws Exception {

        dishService.deleteDish(id);

        MessageResponse response = new MessageResponse();
        response.setMessage("Dish deleted successfully");

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PutMapping("/{id}/available")
    public ResponseEntity<Dish> updateFoodAvailableStatus(@PathVariable Long id) throws Exception {

        Dish dish = dishService.updateAvailabilityStatus(id);

        return new ResponseEntity<>(dish, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDish(@PathVariable Long id, 
                                        @RequestBody UpdateDishRequest updateDishRequest) {

        try {
            Dish updatedDish = dishService.updateDish(id, updateDishRequest);

            return ResponseEntity.ok(updatedDish);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDishById(@PathVariable Long id) {

        try {
            Dish dish = dishService.findDishById(id);

            if (dish != null) {
                return ResponseEntity.ok(dish);

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dish not found");

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        }

    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllDishes() {

        try {
            List<Dish> dishes = dishService.getAllDishes();

            if (!dishes.isEmpty()) {
                return ResponseEntity.ok(dishes);

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No dishes found");

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving dishes: " + e.getMessage());

        }

    }

  

    @GetMapping("/category/{category}")
    public ResponseEntity<?> findDishByCategory(@PathVariable String category) {

        try {
            List<Dish> allDishes = dishService.getAllDishes();
            List<Dish> filteredDishes = dishService.filterByCateGory(allDishes, category);

            if (!filteredDishes.isEmpty()) {
                return ResponseEntity.ok(filteredDishes);

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No dishes found for category: " + category);

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving dishes for category: " + category + ". " + e.getMessage());

        }

    }


}
