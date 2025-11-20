package com.example.onlinefood.controller;

import com.example.onlinefood.repository.OrderSalaryRepo;
import com.example.onlinefood.response.OrderSalaryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderSalaryController {

    @Autowired
    private OrderSalaryRepo orderSalaryRepo;

    @GetMapping("/report")
    public ResponseEntity<List<OrderSalaryResponse>> selectReport() throws Exception {

        List<OrderSalaryResponse> orderSalaryResponses = orderSalaryRepo.selectByMonth();

        if (orderSalaryResponses.isEmpty() || null == orderSalaryResponses) {
            throw new Exception("The return is empty. Please check whether the data exists");
        }

        return new ResponseEntity<>(orderSalaryResponses, HttpStatus.OK);
        
    }

}
