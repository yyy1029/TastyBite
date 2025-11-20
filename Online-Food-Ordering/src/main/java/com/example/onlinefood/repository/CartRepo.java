package com.example.onlinefood.repository;

import com.example.onlinefood.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {

    public Cart findByCustomerId(Long userId);

}
