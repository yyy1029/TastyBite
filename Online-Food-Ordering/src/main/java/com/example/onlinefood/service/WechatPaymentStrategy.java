package com.example.onlinefood.service;

import com.example.onlinefood.model.Order;
import com.example.onlinefood.model.User;
import org.springframework.stereotype.Service;

@Service
public class WechatPaymentStrategy implements PaymentStrategy {

    @Override
    public boolean pay(Order order, User user) {

        // Implement wechat payment logic
        // Assume the payment is successful
        System.out.println("Wechat payment successful.");

        return true;

    }

}
