package com.example.onlinefood.repository;

import com.example.onlinefood.model.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DishRepo extends JpaRepository<Dish,Long> {

    //Use keywords to implement lookup functions
    @Query("SELECT f FROM Dish f WHERE f.name LIKE %:keyword% OR f.dishCategory.name LIKE %:keyword%")
    List<Dish> searchDishBy(@Param("keyword") String keyword);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM dish WHERE id = ?1", nativeQuery = true)
    void deleteDishById(Long dishId);

}
