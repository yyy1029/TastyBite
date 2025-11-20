package com.example.onlinefood.service;

import com.example.onlinefood.model.Address;
import com.example.onlinefood.model.Order;
import com.example.onlinefood.model.User;
import com.example.onlinefood.request.OrderRequest;

import java.util.List;

public interface OrderService {

    public Order createOrder(OrderRequest order, User user) throws Exception;

    public Order updateOrder(Long orderId, String orderStatus) throws Exception;

    public List<Order> getUserOrder(Long userId) throws Exception;

    public List<Order> getRestaurantOrder(String orderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;

    Order getOrderId(Long orderId) throws Exception;

    public Address getOrderAddress(Long orderId) throws Exception;

    public String getOrderUserName(Long orderId) throws Exception;

}
