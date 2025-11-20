package com.example.onlinefood.service;

import com.example.onlinefood.model.Order;
import com.example.onlinefood.model.User;
import org.springframework.stereotype.Service;

@Service
public class BalancePaymentStrategy implements PaymentStrategy {

    @Override
    public boolean pay(Order order, User user) {

        // Implement balance payment logic
        // Assume the payment is successful
        System.out.println("Balance payment successful.");

        return true;

    }

}
