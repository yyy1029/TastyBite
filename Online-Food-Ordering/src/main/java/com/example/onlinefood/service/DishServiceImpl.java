package com.example.onlinefood.service;

import com.example.onlinefood.model.Category;
import com.example.onlinefood.model.Dish;
import com.example.onlinefood.model.IngredientCategory;
import com.example.onlinefood.model.IngredientItem;
import com.example.onlinefood.repository.DishRepo;
import com.example.onlinefood.request.CreateDishRequest;
import com.example.onlinefood.request.UpdateDishRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class DishServiceImpl implements DishService {

    @Autowired
    private DishRepo dishRepo;

    @Override
    public Dish createDish(CreateDishRequest request, Category category) {

        Dish dish = new Dish();
        dish.setDishCategory(category);
        dish.setDescription(request.getDescription());
        dish.setImages(request.getImages());
        dish.setName(request.getName());
        dish.setPrice(request.getPrice());
        dish.setIngredients(request.getIngredientItems());

        return dishRepo.save(dish);

    }

    @Override
    public void deleteDish(Long DishId) throws Exception {

        dishRepo.deleteDishById(DishId);

    }

    @Override
    public List<Dish> searchDish(String keyword) {

        return dishRepo.searchDishBy(keyword);

    }

    @Override
    public List<Dish> filterByCateGory(List<Dish> dishes, String dishCategory) {

        return dishes.stream().filter(dish ->{
            if(dish.getDishCategory()!= null){
                return dish.getDishCategory().getName().equals(dishCategory);
            }
            return false;
        }).collect(Collectors.toList());

    }

    @Override
    public Dish findDishById(Long DishId) throws Exception {

        Optional<Dish> optionalDish = dishRepo.findById(DishId);

        if (optionalDish.isEmpty()){
            throw new Exception("Dish not exist!");
        }
        return optionalDish.get();

    }

    @Override
    public Dish updateAvailabilityStatus(Long DishId) throws Exception {

        Dish dish = findDishById(DishId);

        dish.setAvailable(!dish.isAvailable());

        return dishRepo.save(dish);

    }

    @Override
    public Dish likeDish(Long dishId) {

        Dish dish = dishRepo.findById(dishId).orElse(null);

        if (dish != null) {
            dish.setLikes(dish.getLikes() + 1);
            return dishRepo.save(dish);
        }
        return null;

    }

    @Override
    public Dish deleteLike(Long dishId) {

        Dish dish = dishRepo.findById(dishId).orElse(null);

        if (dish != null) {
            dish.setLikes(dish.getLikes() - 1);
            return dishRepo.save(dish);

        } 
            return null;

    }

    @Override
    public Dish updateDish(Long dishId, UpdateDishRequest updateDishRequest) throws Exception {

        Optional<Dish> optionalDish = dishRepo.findById(dishId);

        if (optionalDish.isPresent()) {

            Dish dish = optionalDish.get();

            dish.setAvailable(updateDishRequest.isAvailable());

            if (updateDishRequest.getName() != null && !updateDishRequest.getName().isEmpty()) {
                dish.setName(updateDishRequest.getName());

            }
            if (updateDishRequest.getPrice() != null) {
                dish.setPrice(updateDishRequest.getPrice());

            }
            return dishRepo.save(dish);

        } else {
            throw new Exception("Dish not found!");

        }

    }

    @Override
    public List<Dish> getAllDishes() {

        return dishRepo.findAll();

    }

    @Override
    public List<Map<String, Object>> getIngredientItemsByDishId(Long dishId) {

        Optional<Dish> optionalDish = dishRepo.findById(dishId);

        if (optionalDish.isPresent()) {

            Dish dish = optionalDish.get();

            List<Map<String, Object>> result = new ArrayList<>();

            Map<String, List<Map<String, Object>>> categoryMap = new HashMap<>();

            //Iterate over each ingredient item that dish owns.
            for (IngredientItem ingredientItem : dish.getIngredients()) {

                IngredientCategory category = ingredientItem.getCategory();

                String categoryName = category.getName();

                //Check if the current category already exists in the result Map, and create a new category if it does not.
                if (!categoryMap.containsKey(categoryName)) {
                    categoryMap.put(categoryName, new ArrayList<>());

                }

                //Construct component item information
                Map<String, Object> itemMap = new HashMap<>();
                itemMap.put("id", ingredientItem.getId());
                itemMap.put("name", ingredientItem.getName());
                itemMap.put("stoke", ingredientItem.isStoke());

                //Add constituent items to the corresponding categories
                categoryMap.get(categoryName).add(itemMap);

            }

            //Add category information to the results list
            for (Map.Entry<String, List<Map<String, Object>>> entry : categoryMap.entrySet()) {

                String categoryName = entry.getKey();

                List<Map<String, Object>> items = entry.getValue();

                Map<String, Object> categoryInfo = new HashMap<>();
                categoryInfo.put("categoryName", categoryName);
                categoryInfo.put("items", items);

                result.add(categoryInfo);

            }
            return result;

        } else {

            throw new IllegalArgumentException("Dish with id " + dishId + " not found");
        }

    }
    
}
