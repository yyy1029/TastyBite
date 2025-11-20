package com.example.onlinefood.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IngredientCategory { //Ingredients by Category Meat / Protein / Vegetables / Sauces ....

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<IngredientItem> ingredients = new ArrayList<>();

    private String name;

    @Override
    public String toString() {
        return "IngredientCategory{id=" + id + ", name='" + name + "'}";
    }

}
