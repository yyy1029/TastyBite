package com.example.onlinefood.request;

import lombok.Data;

@Data
public class OrderRatingRequest {

    private Long orderId;

    private int rating;

    private String comment;

}
