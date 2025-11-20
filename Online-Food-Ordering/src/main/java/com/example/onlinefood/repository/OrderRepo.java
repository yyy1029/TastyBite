package com.example.onlinefood.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.onlinefood.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {

    public List<Order> findByCustomerId(Long userId);

}
