package com.example.onlinefood.request;

import lombok.Data;

@Data
public class PaymentRequest {

    private Long orderId;

    private String paymentMethod;

}
