package com.example.onlinefood.model;

import com.example.onlinefood.Enum.PaymentMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    private Order order;

    @ManyToOne
    private User user;

    private Date paymentDate;

    private PaymentMethod paymentMethod;// Add payment method properties

}
