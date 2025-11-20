package com.example.onlinefood.request;


import com.example.onlinefood.model.Category;
import com.example.onlinefood.model.IngredientItem;
import lombok.Data;

import java.util.List;

@Data
public class CreateDishRequest {

    private String name;

    private String description;

    private Long price;

    private Category category;
    
    private String images;

    private List<IngredientItem> ingredientItems;

}
