package com.example.onlinefood.service;

import com.example.onlinefood.model.Order;
import com.example.onlinefood.model.OrderRating;
import com.example.onlinefood.repository.OrderRatingRepo;
import com.example.onlinefood.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderRatingServiceImpl implements OrderRatingService {

    @Autowired
    private OrderRatingRepo orderRatingRepo;

    @Autowired
    OrderRepo orderRepo;

    @Override
    public OrderRating createOrderRating(OrderRating orderRating) {
        return orderRatingRepo.save(orderRating);
    }

    @Override
    public void deleteOrderRatingByOrderId(Long orderId) {

        // First delete the associated order
        orderRepo.deleteById(orderId);

        // Delete the score record associated with the order
        orderRatingRepo.deleteByOrderId(orderId);
    }

    // Save the star
    public void saveOrderRating(Long orderId, int rating) {

        // Use the order repository to get the order object
        Order order = orderRepo.findById(orderId).orElse(null);

        if (order != null) {

            // Update the scoring information of the order
            order.setRating(rating);

            orderRepo.save(order);

        }

    }

    @Override
    public Order saveCommentToOrder(Long orderId, String comment) {

        Optional<Order> optionalOrder = orderRepo.findById(orderId);

        if (optionalOrder.isPresent()) {

            Order order = optionalOrder.get();

            order.setComment(comment);

            return orderRepo.save(order);

        } else {

            return null;

        }

    }

}
