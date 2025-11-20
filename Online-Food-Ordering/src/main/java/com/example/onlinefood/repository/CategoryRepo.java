package com.example.onlinefood.repository;

import com.example.onlinefood.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category,Long> {

    Category findByName(String name);
    
}
