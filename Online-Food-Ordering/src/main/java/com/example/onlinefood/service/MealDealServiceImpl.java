package com.example.onlinefood.service;

import com.example.onlinefood.model.Dish;
import com.example.onlinefood.model.MealDeal;
import com.example.onlinefood.repository.MealDealRepo;
import com.example.onlinefood.request.CreateMealDealRequest;
import com.example.onlinefood.request.UpdateMealDealRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MealDealServiceImpl implements MealDealService {

    @Autowired
    private MealDealRepo mealDealRepo;

    @Override
    public MealDeal createMealDeal(CreateMealDealRequest request,  List<Dish> dishes) {
        MealDeal mealDeal = new MealDeal();

        mealDeal.setName(request.getName());

        mealDeal.setDiscount(request.getDiscount());

        if (dishes != null) {
            mealDeal.setMealDealDishes(dishes);
        }

        return mealDealRepo.save(mealDeal);

    }

    @Override
    public void deleteMealDeal(Long mealDealId) throws Exception {

        MealDeal mealDeal = findMealDealById(mealDealId);

        mealDealRepo.delete(mealDeal);

    }

    @Override
    public List<MealDeal> searchMealDeal(String keyword) {

        return mealDealRepo.searchMealDealBy(keyword);

    }

    @Override
    public MealDeal findMealDealById(Long mealDealId) throws Exception {

        Optional<MealDeal> optionalMealDeal = mealDealRepo.findById(mealDealId);

        if (optionalMealDeal.isEmpty()){
            throw new Exception("Meal deal not exist!");
        }
        return optionalMealDeal.get();

    }

    @Override
    public MealDeal getMealDealById(Long id) {

        Optional<MealDeal> optionalMealDeal = mealDealRepo.findById(id);

        return optionalMealDeal.orElse(null);
    }

    @Override
    public MealDeal updateMealDeal(Long mealDealId, UpdateMealDealRequest request) throws Exception {

        MealDeal mealDeal = findMealDealById(mealDealId);

        if (request.getName() != null) {
            mealDeal.setName(request.getName());
        }

        if (request.getDiscount() != null) {
            mealDeal.setDiscount(request.getDiscount());
        }

        return mealDealRepo.save(mealDeal);

    }

    @Override
    public Long calculateTotalPrice(MealDeal mealDeal) {

        Long totalPrice = 0L;

        for (Dish dish : mealDeal.getMealDealDishes()) {

            totalPrice += dish.getPrice();
        }

        return totalPrice;

    }

    @Override
    public List<MealDeal> getAllMealDeals() {

        return mealDealRepo.findAll();

    }


    @Override
    public MealDeal findMealDealByName(String name) {

        return mealDealRepo.findMealDealByName(name);

    }
    
}
