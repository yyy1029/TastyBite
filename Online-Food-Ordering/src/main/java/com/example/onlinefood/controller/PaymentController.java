package com.example.onlinefood.controller;

import com.example.onlinefood.model.User;
import com.example.onlinefood.request.PaymentRequest;
import com.example.onlinefood.response.MessageResponse;
import com.example.onlinefood.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/order/pay")
    public ResponseEntity<MessageResponse> payOrder(@RequestBody PaymentRequest paymentRequest,
                                                    @RequestHeader("Authorization") String jwt) {

        // Implement this method to get user information from JWT
        User user = getUserFromJwtToken(jwt);
        Long orderId = paymentRequest.getOrderId();
        String paymentMethod = paymentRequest.getPaymentMethod();

        boolean paymentResult = paymentService.pay(orderId, user, paymentMethod);

        MessageResponse response = new MessageResponse();
        if (paymentResult) {
            response.setMessage("Order paid successfully!");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setMessage("Order payment failed, the balance is insufficient!");

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

    }

    // Implement methods to get user information from JWT
    private User getUserFromJwtToken(String jwt) {

        // Implement the logic of obtaining user information
        return null;
    }

}

