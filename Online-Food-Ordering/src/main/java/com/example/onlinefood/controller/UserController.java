package com.example.onlinefood.controller;

import com.example.onlinefood.model.Dish;
import com.example.onlinefood.model.User;
import com.example.onlinefood.request.ProfileUpdateDTO;
import com.example.onlinefood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserByJwtToken(jwt);
            return ResponseEntity.ok(user);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

        }
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long id,
                                               @RequestBody ProfileUpdateDTO profileUpdateDTO) {
        try {
            // Retrieve the user by ID to ensure they exist
            User existingUser = userService.findUserById(id);

            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

            }

            // Update username if it's provided and not empty
            if (profileUpdateDTO.getNewUsername() != null && !profileUpdateDTO.getNewUsername().isEmpty()) {
                boolean usernameUpdated = userService.updateName(id, profileUpdateDTO.getNewUsername());
                if (!usernameUpdated) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username could not be updated");

                }
            }

            // Update password if it's provided and not empty
            if (profileUpdateDTO.getNewPassword() != null && !profileUpdateDTO.getNewPassword().isEmpty()) {
                boolean passwordUpdated = userService.updatePassword(id, profileUpdateDTO.getNewPassword());
                if (!passwordUpdated) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password could not be updated");

                }
            }

            // Update phone number if it's provided and not empty
            if (profileUpdateDTO.getNewPhoneNumber() != null && !profileUpdateDTO.getNewPhoneNumber().isEmpty()) {
                boolean phoneUpdated = userService.updatePhoneNumber(id, profileUpdateDTO.getNewPhoneNumber());

                if (!phoneUpdated) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Phone number could not be updated");

                }
            }

            // Update gender setting if it's provided and not empty
            if (profileUpdateDTO.getGenderSetting() != null && !profileUpdateDTO.getGenderSetting().isEmpty()) {
                boolean genderUpdated = userService.updateGenderSetting(id, profileUpdateDTO.getGenderSetting());
                if (!genderUpdated) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Gender setting could not be updated");

                }
            }

            // Update avatar URL if it's provided and not empty
            if (profileUpdateDTO.getNewAvatarUrl() != null && !profileUpdateDTO.getNewAvatarUrl().isEmpty()) {
                boolean avatarUpdated = userService.updateAvatar(id, profileUpdateDTO.getNewAvatarUrl());
                if (!avatarUpdated) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Avatar could not be updated");

                }
            }

            // If all updates are successful, retrieve the updated user and return it
            User updatedUser = userService.findUserById(id);

            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            // If there's an exception, return an internal server error with the exception message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }

    }


    @PostMapping("/{userId}/favorites/add/{dishId}")
    public String addToFavorites(@PathVariable Long userId,
                                 @PathVariable Long dishId) {

        boolean added = userService.addToFavorites(userId, dishId);

        return added ? "Added to favorites" : "User or dish not found";

    }

    @DeleteMapping("/{userId}/favorites/remove/{dishId}")
    public String removeFromFavorites(@PathVariable Long userId,
                                      @PathVariable Long dishId) {

        boolean removed = userService.removeFromFavorites(userId, dishId);

        return removed ? "Removed from favorites" : "User or dish not found";

    }

    //Get a list of a specific user's favourites
    @GetMapping("/{userId}/favorites")
    public ResponseEntity<List<Dish>> getUserFavoriteDishes(@PathVariable Long userId) {

        List<Dish> favorites = userService.getUserFavoriteDishes(userId);

        return new ResponseEntity<>(favorites, HttpStatus.OK);

    }

}
