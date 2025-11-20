package com.example.onlinefood.service;

import com.example.onlinefood.Enum.PaymentMethod;
import com.example.onlinefood.model.Order;
import com.example.onlinefood.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentStrategyFactory paymentStrategyFactory;

    @Override
    public boolean pay(Long orderId, User user, String paymentMethod) {

        // Get order information (here you can call the corresponding order service to
        // get order information)
        Order order = getOrderById(orderId);

        // Use the Payment Policy Factory to obtain the appropriate payment policy
        PaymentStrategy paymentStrategy = paymentStrategyFactory
                .getPaymentStrategy(PaymentMethod.valueOf(paymentMethod));

        // Execute payment
        return paymentStrategy.pay(order, user);

    }

    // Implement the method of obtaining order information
    private Order getOrderById(Long orderId) {

        // Here you need to implement the logic to get order information based on the
        // order ID
        return null;

    }

}
