package com.example.onlinefood.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonIgnore // Indicates that relationship in which CartItem is called does not require cart
    private Cart cart;

    @ManyToOne // One dish can be in many people's shopping carts
    private Dish dish;

    private int quantity;// Number of individual items

    private List<String> ingredients;// Item content of shopping cart

    private Long totalPrice;

}