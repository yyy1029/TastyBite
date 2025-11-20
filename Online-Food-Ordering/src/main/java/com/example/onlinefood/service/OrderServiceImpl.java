package com.example.onlinefood.service;

import com.example.onlinefood.model.*;
import com.example.onlinefood.repository.AddressRepo;
import com.example.onlinefood.repository.OrderItemRepo;
import com.example.onlinefood.repository.OrderRepo;
import com.example.onlinefood.repository.UserRepo;
import com.example.onlinefood.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderItemRepo orderItemRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CartService cartService;

    @Override
    public Order createOrder(OrderRequest order, User user) throws Exception {

        Address shippedAddress = order.getDeliveryAddress();

        Address saveAddress = addressRepo.save(shippedAddress);

        // If the incoming address for this request is not in the address book, it is
        // added
        if (!user.getAddresses().contains(saveAddress)) {
            user.getAddresses().add(saveAddress);
            userRepo.save(user); // Update the user information in the database
        }

        // Create a new order
        Order createdOrder = new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(saveAddress);
        createdOrder.setCreatedAt(new Date());

        Cart cart = cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        // Set the order item for each item in the placed cart
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setDish(cartItem.getDish());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            // Store the order items in the database
            OrderItem savedOrderItem = orderItemRepo.save(orderItem);

            // Add to the list
            orderItems.add(savedOrderItem);

        }

        // After creating all the order items
        // Calculate the total of all order items
        Long totalPrice = cartService.calculateCartTotals(cart);

        // Add all created order items to Order
        createdOrder.setItems(orderItems);
        createdOrder.setTotalPrice(totalPrice);
        orderRepo.save(createdOrder);

        return createdOrder;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {

        Optional<Order> optionalOrder = orderRepo.findById(orderId);

        if (optionalOrder.isEmpty()) {

            throw new Exception("The Order is not found");

        }

        return optionalOrder.get();

    }

    @Override
    public Order getOrderId(Long orderId) throws Exception {

        return orderRepo.findById(orderId).orElseThrow(() -> new Exception("Order not found"));

    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {

        Order order = findOrderById(orderId);

        if (orderStatus.equals("OUT_FOR_DELIVERY")
                || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED")
                || orderStatus.equals("PENDING")) {

            order.setOrderStatus(orderStatus);

            return orderRepo.save(order);

        }

        throw new Exception("Please select a valid order status");

    }

    @Override
    public List<Order> getUserOrder(Long userId) throws Exception {

        return orderRepo.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantOrder(String orderStatus) throws Exception {

        List<Order> orders = orderRepo.findAll();

        if (orderStatus != null) {
            orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus))
                    .collect(Collectors.toList());
        }

        return orders;

    }

    @Override
    public Address getOrderAddress(Long orderId) throws Exception {

        Order order = findOrderById(orderId);

        return order.getDeliveryAddress();

    }

    @Override
    public String getOrderUserName(Long orderId) throws Exception {

        Order order = findOrderById(orderId);

        User user = order.getCustomer();

        return user.getFullName();

    }

}
