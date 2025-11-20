package com.example.onlinefood.service;


import com.example.onlinefood.config.JwtProvider;
import com.example.onlinefood.model.Dish;
import com.example.onlinefood.model.User;
import com.example.onlinefood.repository.DishRepo;
import com.example.onlinefood.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{


    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private DishRepo dishRepo;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {

        String email = jwtProvider.getEmailFromJwtToken(jwt);

        User user = findUserByEmail(email);

        return user;

    }

    @Override
    public User findUserByEmail(String email) throws Exception {

        User user = userRepo.findUserByEmail(email);

        if(user == null){
            throw new Exception("User not found (by email)");
        }

        return user;

    }

    @Override
    public boolean addToFavorites(Long userId, Long dishId) {

        Optional<User> userOptional = userRepo.findById(userId);
        Optional<Dish> dishOptional = dishRepo.findById(dishId);

        if (userOptional.isPresent() && dishOptional.isPresent()) {
            User user = userOptional.get();
            Dish dish = dishOptional.get();
            
            if (user.getFavoriteDishes().contains(dish)) {
                return false; 
            }
            
            user.getFavoriteDishes().add(dish);

            userRepo.save(user);
            
            return true; 
        }
        
        return false; 

    }

    @Override
    public boolean removeFromFavorites(Long userId, Long dishId) {

        Optional<User> userOptional = userRepo.findById(userId);
        Optional<Dish> dishOptional = dishRepo.findById(dishId);

        if (userOptional.isPresent() && dishOptional.isPresent()) {

            User user = userOptional.get();
            Dish dish = dishOptional.get();
            
            if (!user.getFavoriteDishes().contains(dish)) {
                return false;

            }
            
            user.getFavoriteDishes().remove(dish);
            userRepo.save(user);
            
            return true;

        }
        
        return false;

    }
        
  

    @Override
    public List<Dish> getUserFavoriteDishes(Long userId) {

        User user = userRepo.findById(userId).orElse(null);

        if (user != null) {
            return user.getFavoriteDishes();
        }

        return null;

    }


    //yty

    @Override
    public boolean updatePassword(Long userId, String newPassword) {

        Optional<User> userOptional = userRepo.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(newPassword);
            userRepo.save(user);
            return true;

        }
        return false;

    }

    @Override
    public boolean updateName(Long userId, String newName) {

        Optional<User> userOptional = userRepo.findById(userId);

        if (userOptional.isPresent()) {

            User user = userOptional.get();
            user.setFullName(newName);
            userRepo.save(user);

            return true;

        }
        return false;

    }

    @Override
    public boolean updateAvatar(Long userId, String newAvatarUrl) {

        Optional<User> userOptional = userRepo.findById(userId);

        if (userOptional.isPresent()) {

            User user = userOptional.get();
            user.setAvatar(newAvatarUrl);
            userRepo.save(user);

            return true;

        }
        return false;

    }
    @Override
    public boolean updatePhoneNumber(Long userId, String newPhoneNumber) {

        Optional<User> userOptional = userRepo.findById(userId);

        if (userOptional.isPresent()) {

            User user = userOptional.get();

            //Perform a type check or conversion to ensure that the phone number is a string type
            if (!isValidPhoneNumber(newPhoneNumber)) {
                return false;

            }
            user.setPhoneNumber(newPhoneNumber);

            userRepo.save(user);

            return true;

        }
        return false;

    }

    //Phone number verification method
    private boolean isValidPhoneNumber(String phoneNumber) {

        //Check if the phone number is empty
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            return false;

        }

        //Check if the phone number contains only numeric characters
        if (!phoneNumber.matches("\\d+")) {
            return false;

        }

        //Check that the length of the telephone number is within reasonable limits
        if (phoneNumber.length() < 7 || phoneNumber.length() > 15) {
            return false;

        }
        //Return true if all checks pass
        return true;

    }


    @Override
    public boolean updateGenderSetting(Long userId, String genderSetting) {

        Optional<User> userOptional = userRepo.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setGender(genderSetting); // Ensure the User entity has a field `gender` for gender setting
            userRepo.save(user);
            return true;

        }
        return false;

    }

    @Override
    public User findUserById(Long id) {

        Optional<User> userOptional = userRepo.findById(id);

        return userOptional.orElse(null);

    }
    
}
