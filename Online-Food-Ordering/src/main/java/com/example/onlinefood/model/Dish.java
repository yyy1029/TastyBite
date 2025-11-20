package com.example.onlinefood.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dish {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String description;

    private Long price;

    @ManyToOne
    private Category dishCategory;

    private String images;

    private boolean available; 

    //Multiple ingredients may be in one food One ingredient may also be in multiple foods
    @ManyToMany 
    @JoinTable(
            name = "dish_ingredient",
            joinColumns = @JoinColumn(name = "dish_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id"),
            foreignKey = @ForeignKey(value = ConstraintMode.NO_CONSTRAINT)
    )
    private List<IngredientItem> ingredients = new ArrayList<>();

    private Date createdDate;

    private int likes;

    @JsonIgnore
    @ManyToMany(mappedBy = "favoriteDishes")
    private List<User> favoriteByUsers;

}
