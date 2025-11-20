package com.example.onlinefood.controller;

import com.example.onlinefood.model.Dish;
import com.example.onlinefood.model.MealDeal;
import com.example.onlinefood.model.USER_ROLE;
import com.example.onlinefood.model.User;
import com.example.onlinefood.request.CreateMealDealRequest;
import com.example.onlinefood.request.UpdateMealDealRequest;
import com.example.onlinefood.response.MessageResponse;
import com.example.onlinefood.service.MealDealService;
import com.example.onlinefood.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/mealDeal")
public class AdminMealDealController {

    @Autowired
    private MealDealService mealDealService;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<MealDeal>> getAllMealDeals() {

        try {
            List<MealDeal> mealDeals = mealDealService.getAllMealDeals();

            for (MealDeal mealDeal : mealDeals) {
                Long totalPrice = mealDealService.calculateTotalPrice(mealDeal);
                Double discount = mealDeal.getDiscount();
                Double price = totalPrice * (1 - discount);
                mealDeal.setPrice(price);
            }
            if (!mealDeals.isEmpty()) {
                return ResponseEntity.ok(mealDeals);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions, such as database errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<MealDeal> getMealDealById(@PathVariable Long id) {

        try {
            MealDeal mealDeal = mealDealService.getMealDealById(id);

            if (mealDeal != null) {
                Long totalPrice = mealDealService.calculateTotalPrice(mealDeal);
                Double discount = mealDeal.getDiscount();
                Double price = totalPrice * (1 - discount);
                mealDeal.setPrice(price);
                return ResponseEntity.ok(mealDeal);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions, such as database errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


    @PostMapping("/create")
    public ResponseEntity<MealDeal> createMealDeal(@RequestBody CreateMealDealRequest request,
                                                   @RequestHeader("Authorization")String jwt) throws Exception {

        //User user = userService.findUserByJwtToken(jwt);

        MealDeal existingMealDeal = mealDealService.findMealDealByName(request.getName());

        if (existingMealDeal != null) {
            // If a category with the same name exists, return the wrong ResponseEntity
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); 
        }

        List<Dish> dishes = request.getDishes();

        MealDeal mealDeal = mealDealService.createMealDeal(request,dishes);

        // Prepare response message
        MessageResponse response = new MessageResponse();
        response.setMessage("Meal deal created successfully");

        // Return response with HTTP status CREATED
        return new ResponseEntity<MealDeal>(mealDeal, HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteMealDeal(@PathVariable("id") Long id,
                                                          @RequestHeader("Authorization") String jwt) {

        try {
             // Find users by JWT Token
            User user = userService.findUserByJwtToken(jwt);

            // Check the user's role, and if it is not an administrator, return a response with the wrong permissions
            if (user.getRole() != USER_ROLE.ROLE_MANAGER) {
                MessageResponse response = new MessageResponse();
                response.setMessage("You do not have permission to delete meal deals.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);

            }

             // Call the mealDealService to remove the meal package
            mealDealService.deleteMealDeal(id);

            // Returns a response that the deletion was successful
            MessageResponse response = new MessageResponse();
            response.setMessage("Meal deal deleted successfully.");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // 处理异常情况，比如餐品套餐不存在等
            MessageResponse response = new MessageResponse();
            response.setMessage("Failed to delete meal deal: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            
        }

    }




    @PutMapping("/{id}/update")
    public ResponseEntity<MealDeal> updateMealDeal(@PathVariable Long id,
                                                   @RequestBody UpdateMealDealRequest request,
                                                   @RequestHeader("Authorization") String jwt) throws Exception {

        //User user = userService.findUserByJwtToken(jwt);

        //Here the method to update the package is called, passing in the request object for updating the package and the package ID
        MealDeal updatedMealDeal = mealDealService.updateMealDeal(id, request);

        MessageResponse response = new MessageResponse();
        response.setMessage("Meal deal updated successfully");

        return new ResponseEntity<>(updatedMealDeal, HttpStatus.OK);

    }

}