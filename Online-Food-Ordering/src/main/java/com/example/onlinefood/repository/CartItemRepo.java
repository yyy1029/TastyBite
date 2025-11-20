package com.example.onlinefood.repository;

import com.example.onlinefood.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {

}
