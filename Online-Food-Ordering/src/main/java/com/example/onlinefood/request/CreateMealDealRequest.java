package com.example.onlinefood.request;

import com.example.onlinefood.model.Dish;
import lombok.Data;

import java.util.List;

@Data
public class CreateMealDealRequest {

    private String name;

    private Double discount;

    private List<Dish> dishes;

}
