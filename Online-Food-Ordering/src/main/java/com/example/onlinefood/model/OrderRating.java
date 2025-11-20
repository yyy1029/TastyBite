package com.example.onlinefood.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int userId;

    private int rating;

    private String comment;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

}
