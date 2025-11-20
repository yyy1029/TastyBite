package com.example.onlinefood.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)// Increment primary key value automatically
    private long id;

    @ManyToOne// Order entries from different users' orders may be for the same dish
    private Dish dish;

    private int quantity;// The number of items in an entry

    private long totalPrice;

    private List<String> ingredients;

    @ManyToOne
    private Order order;// Add this line to indicate that each OrderItem belongs to an Order
    
}
