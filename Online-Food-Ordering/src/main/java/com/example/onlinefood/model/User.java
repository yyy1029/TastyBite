package com.example.onlinefood.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullName;

    private String email;

    @Column(name = "phone_number", columnDefinition = "VARCHAR(255) DEFAULT 'N/A'", nullable = true)
    private String phoneNumber;
    @Column(name = "gender" ) // Added the gender column
    private String gender;

    //So that the password does not appear when accessing the user information.
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private USER_ROLE role;

    private String avatar;

    @JsonIgnore
    //because an order is not needed to join or get a user
    //mappedBy = "customer" uses the customer attribute to keep the user associated with the order
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private List<Order> orders = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_favorite",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "dish_id"))
    private List<Dish> favoriteDishes;

    //When a user is deleted all addresses are deleted.
    //CascadeType.ALL user is cascaded with all the addresses he owns
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();

    public void addAddress(Address address) {
        this.addresses.add(address);
    }

}
