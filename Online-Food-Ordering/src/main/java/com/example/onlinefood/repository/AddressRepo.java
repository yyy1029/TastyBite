package com.example.onlinefood.repository;

import com.example.onlinefood.model.Address;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address,Long> {

    List<Address> findByUserId(Long userId);
    
}
