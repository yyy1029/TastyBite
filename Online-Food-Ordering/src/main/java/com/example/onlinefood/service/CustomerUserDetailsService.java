package com.example.onlinefood.service;

import com.example.onlinefood.model.USER_ROLE;
import com.example.onlinefood.model.User;
import com.example.onlinefood.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//After adding service here, the system will not automatically generate a password
//Let users set their own passwords
@Service
public class CustomerUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findUserByEmail(username);

        if (user ==null){
            throw new UsernameNotFoundException("User is not found with email " + username);

        }

        USER_ROLE role = user.getRole();
        if(role == null) role = USER_ROLE.ROLE_CUSTOMER;

        //Add this role to the list of roles that can be authenticated in spring boot security.
        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(role.toString()));

        //return the user's detail information
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);

    }
    
}
