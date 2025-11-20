package com.example.onlinefood.request;

import lombok.Data;

@Data
public class UpdateDishRequest {

    private String name;

    private Long price;

    private boolean available;
    
}
