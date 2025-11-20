package com.example.onlinefood.response;

import com.example.onlinefood.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;
    
    private String message;

    private USER_ROLE userRole;

}
