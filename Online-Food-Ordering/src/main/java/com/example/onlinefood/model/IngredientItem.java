package com.example.onlinefood.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IngredientItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private IngredientCategory category;

    //stoke
    private  boolean isStoke = true;

    @Override
    public String toString() {
        return "IngredientItem{id=" + id + ", name='" + name + "'}";
    }

}
