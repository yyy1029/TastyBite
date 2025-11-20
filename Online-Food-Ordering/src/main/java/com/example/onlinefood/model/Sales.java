package com.example.onlinefood.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sales")
public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Date finishDate;// Obtain the monthly report based on the time

    private long orderNum;// Order quantity

    private long price;// Account for each payment

}