package com.example.onlinefood.repository;

import com.example.onlinefood.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    public User findUserByEmail(String username);
    
}
