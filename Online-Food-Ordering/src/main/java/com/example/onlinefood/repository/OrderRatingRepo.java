package com.example.onlinefood.repository;

import com.example.onlinefood.model.OrderRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRatingRepo extends JpaRepository<OrderRating, Long> {

    OrderRating findByOrderId(Long orderId);

    void deleteByOrderId(Long orderId);

}
