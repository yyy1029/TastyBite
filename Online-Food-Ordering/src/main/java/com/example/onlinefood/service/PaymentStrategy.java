package com.example.onlinefood.service;

import com.example.onlinefood.model.Order;
import com.example.onlinefood.model.User;

public interface PaymentStrategy {

    boolean pay(Order order, User user);

}
