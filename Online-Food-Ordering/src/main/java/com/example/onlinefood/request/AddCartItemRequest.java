package com.example.onlinefood.request;

import lombok.Data;

import java.util.List;

@Data
public class AddCartItemRequest {

    private Long DishId;

    private int quantity;

    private List<String> ingredients;

}
