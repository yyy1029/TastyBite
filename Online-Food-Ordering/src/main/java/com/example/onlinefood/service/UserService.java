package com.example.onlinefood.service;

import com.example.onlinefood.model.Dish;
import com.example.onlinefood.model.User;

import java.util.List;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;

    public boolean addToFavorites(Long userId, Long dishId);

    public boolean removeFromFavorites(Long userId, Long dishId);

    public List<Dish> getUserFavoriteDishes(Long userId);

    public boolean updatePassword(Long userId, String newPassword);

    boolean updateName(Long userId, String newName);

    boolean updateAvatar(Long userId, String newAvatarUrl);

    boolean updatePhoneNumber(Long userId, String newPhoneNumber);

    boolean updateGenderSetting(Long userId, String genderSetting);
    
    User findUserById(Long id);
}
