package com.example.onlinefood.controller;


import com.example.onlinefood.config.JwtProvider;
import com.example.onlinefood.model.Cart;
import com.example.onlinefood.model.USER_ROLE;
import com.example.onlinefood.model.User;
import com.example.onlinefood.repository.CartRepo;
import com.example.onlinefood.repository.UserRepo;
import com.example.onlinefood.request.LoginRequest;
import com.example.onlinefood.response.AuthResponse;
import com.example.onlinefood.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider; //token

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService; //Set your own password

    @Autowired
    private CartRepo cartRepo;

    @PostMapping("/register") 
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {

        User isEmailExist = userRepo.findUserByEmail(user.getEmail());

        if (isEmailExist != null){//whether the user exists in the database
            throw new Exception("Email is already be used by another account!");
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepo.save(createdUser);

        //Create an own shopping cart for each user
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepo.save(cart);

        //Create an AuthenticationAuthentication object using the email and password provided by the user.
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        //将用户信息存储在安全上下文中 也就是授权的一个操作
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //Use this Authentication object, created with the email and password, to generate a string pilot json web token
        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register Success");
        authResponse.setUserRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    }

    @PostMapping("/sign_in")
    public ResponseEntity<AuthResponse> singIn(@RequestBody LoginRequest request){

        String username = request.getEmail();
        String password = request.getPassword();

        //Returns an authorisation object which contains the user's details and credentials as well as authorisation information
        Authentication authentication = authenticate(username,password);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

        //After authorisation, a jwt token is generated 
        //which is used by the user to interact with the server Once the user has been authenticated,
        //they can use this token to interact with the server
        String jwt = jwtProvider.generateToken(authentication);


        //Set the response object Set the generated JWT token with the login success message and the user's identity
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login Success");
        authResponse.setUserRole(USER_ROLE.valueOf(role));

        //Pass the authResponse, i.e. the response object and the response status OK, back to the client
        return new ResponseEntity<>(authResponse, HttpStatus.OK);

    }


     // Used to verify that the user exists in the database and that the password is correct
    private Authentication authenticate(String username, String password) {

        //Get the details of the user in the database
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(username);

        //user not in our database
        if(userDetails == null){
            throw new BadCredentialsException("Invalid username");

        }

        //Compare whether the password entered by the user (encrypted first) is the same as the encrypted password in the database
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("Password is not correct");

        };

        //The user has been authenticated
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }
    
}
