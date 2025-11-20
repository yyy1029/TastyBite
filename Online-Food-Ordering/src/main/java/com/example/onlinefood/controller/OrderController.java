package com.example.onlinefood.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onlinefood.model.Address;
import com.example.onlinefood.model.Order;
import com.example.onlinefood.model.User;
import com.example.onlinefood.request.OrderRequest;
import com.example.onlinefood.service.OrderService;
import com.example.onlinefood.service.UserService;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/order") // Create an order
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request,
                                             @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Order order = orderService.createOrder(request, user);

        return new ResponseEntity<>(order, HttpStatus.OK);

    }

    @GetMapping("/order/user") // Get user order history
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<Order> orders = orderService.getUserOrder(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);

    }

    @GetMapping("/order/{orderId}/address")
    public ResponseEntity<Address> getOrderAddress(@PathVariable Long orderId) {

        try {
            Address address = orderService.getOrderAddress(orderId);

            return new ResponseEntity<>(address, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @GetMapping("/order/{orderId}/userName")
    public ResponseEntity<String> getOrderUserName(@PathVariable Long orderId) {

        try {
            String userName = orderService.getOrderUserName(orderId);

            return new ResponseEntity<>(userName, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable Long orderId) {

        try {
            Order order = orderService.getOrderId(orderId);

            return new ResponseEntity<>(order, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

}
