package com.example.onlinefood.service;

import com.example.onlinefood.model.User;
import org.springframework.stereotype.Service;

@Service
public interface PaymentService {

    boolean pay(Long orderId, User user, String paymentMethod);

}
