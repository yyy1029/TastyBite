package com.example.onlinefood.service;

import com.example.onlinefood.model.Order;
import com.example.onlinefood.model.OrderRating;

public interface OrderRatingService {

    OrderRating createOrderRating(OrderRating orderRating);

    void deleteOrderRatingByOrderId(Long orderId);

    public void saveOrderRating(Long orderId, int rating);

    Order saveCommentToOrder(Long orderId, String comment);

}
