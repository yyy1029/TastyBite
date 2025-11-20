package com.example.onlinefood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onlinefood.model.Order;
import com.example.onlinefood.request.OrderRatingRequest;
import com.example.onlinefood.response.MessageResponse;
import com.example.onlinefood.service.OrderRatingService;

@RestController
@RequestMapping("/api")
public class OrderRatingController {

    @Autowired
    private OrderRatingService orderRatingService;

    // Delete historical orders and their ratings
    @DeleteMapping("/order/ratings/delete/{orderId}")
    public ResponseEntity<MessageResponse> deleteOrderRating(@PathVariable Long orderId) {

        orderRatingService.deleteOrderRatingByOrderId(orderId);

        MessageResponse response = new MessageResponse();
        response.setMessage("Order rating deleted successfully!");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    // Save stars to order
    // Save the rating information to the order
    @PostMapping("/order/ratings/save")
    public ResponseEntity<MessageResponse> saveOrderRating(@RequestBody OrderRatingRequest request) {

        Long orderId = request.getOrderId();
        int rating = request.getRating();

        if (orderId == null) {
            // If the order ID is empty, an error response is returned
            MessageResponse response = new MessageResponse();
            response.setMessage("Order ID cannot be null.");

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

        if (rating < 1 || rating > 5) {

            // If the score is not within the valid range, an error response is returned
            MessageResponse response = new MessageResponse();
            response.setMessage("Rating should be between 1 and 5.");

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        }

        // Save the rating information to the order
        orderRatingService.saveOrderRating(orderId, rating);

        // A successful response is returned
        MessageResponse response = new MessageResponse();
        response.setMessage("Order rating saved successfully!");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    // Save the comment
    // Save comments to the order
    @PostMapping("/{orderId}/comments")
    public ResponseEntity<MessageResponse> saveCommentToOrder(@PathVariable Long orderId,
                                                              @RequestBody OrderRatingRequest request) {

        String comment = request.getComment();

        // Call the service method to save the comment to the order
        Order savedOrder = orderRatingService.saveCommentToOrder(orderId, comment);

        if (savedOrder != null) {

            // If the save is successful, a success response is returned
            MessageResponse response = new MessageResponse();
            response.setMessage("Comment saved to order successfully!");

            return new ResponseEntity<>(response, HttpStatus.OK);

        } else {

            // If the order does Not exist, a 404 Not Found error is returned
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }

}
