package com.example.onlinefood.service;

import com.example.onlinefood.model.Order;
import com.example.onlinefood.model.User;
import org.springframework.stereotype.Service;

@Service
public class AlipayPaymentStrategy implements PaymentStrategy {

    @Override
    public boolean pay(Order order, User user) {

        // Implement Alipay payment logic
        // Assume the payment is successful
        System.out.println("Alipay payment successful.");

        return true;

    }

}