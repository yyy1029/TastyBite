package com.example.onlinefood.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private boolean paid;// Indicates whether the order has been paid

    @ManyToOne
    private User customer;

    private long totalAmount;// Order quantity

    private String orderStatus;

    private Date createdAt;

    @ManyToOne
    private Address deliveryAddress;

    @OneToMany
    @JsonManagedReference// An order item represents an item in a user order with quantity and price..
    private List<OrderItem> items;// User orders items

    private int totalItem;

    private Long totalPrice;

    private int rating;

    private String orderName;

    private String comment;

}
