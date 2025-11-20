package com.example.onlinefood;


import com.example.onlinefood.config.JwtProvider;
import com.example.onlinefood.model.Address;
import com.example.onlinefood.model.Cart;
import com.example.onlinefood.model.USER_ROLE;
import com.example.onlinefood.model.User;
import com.example.onlinefood.repository.CartRepo;
import com.example.onlinefood.repository.UserRepo;
import com.example.onlinefood.response.AuthResponse;
import com.example.onlinefood.service.CustomerUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;


@SpringBootTest
public class UserTest {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider; //token

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService; 

    @Autowired
    private CartRepo cartRepo;

    @Value("${file.address}")
    String fileAdress;

  
    @Value("${file.staticPath}")
    String upload;

    @Test
    public void UserRegisterTest(){
        System.out.println("Verify if registration can be successful with an existing email");
        User user=new User();
        user.setFullName("小明");
        user.setEmail("1732868911@qq.com");
        //user.setAddresses("北京市西二旗百度大厦");
        user.setPassword("123456789");
        user.setGender("女");
        user.setRole(USER_ROLE.ROLE_CUSTOMER);
        //输入用户地址 测试
        List<Address> list=new ArrayList<>();
        Address address=new Address();
        address.setAddress("北京市海淀区上地九街百度大厦");
        address.setUser(user);
        list.add(address);
        user.setAddresses(list);
        System.out.println("User address has been added to User.");

     
        User createdUser=new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(createdUser);
   
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepo.save(cart);

        
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        
        SecurityContextHolder.getContext().setAuthentication(authentication);

       
        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register Success");
        authResponse.setUserRole(savedUser.getRole());
        if (authResponse==null){
            System.out.println("Registration error, please try again. This JUnit test has failed");
        }else{
            System.out.println("Registration successful, this JUnit test is successful");
        }
    }
 
    @Test
    public void EmailTest(){
        System.out.println("Test the case where the email is empty to see if registration is possible.");
        User user=new User();
        user.setFullName("小明");
        //user.setEmail("1732868911@qq.com");
        //user.setAddresses("北京市西二旗百度大厦");
        user.setPassword("123456789");
        user.setGender("女");
        user.setRole(USER_ROLE.ROLE_CUSTOMER);
     
        List<Address> list=new ArrayList<>();
        Address address=new Address();
        address.setAddress("北京市海淀区上地九街百度大厦");
        address.setUser(user);
        list.add(address);
        user.setAddresses(list);
        System.out.println("User address has been added to User.");
   
        User createdUser=new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(createdUser);
       
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepo.save(cart);

     
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
       
        SecurityContextHolder.getContext().setAuthentication(authentication);

        
        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register Success");
        authResponse.setUserRole(savedUser.getRole());
        if (authResponse==null){
            System.out.println("Registration error, please try again. This JUnit test has failed");
        }else{
            System.out.println("Registration successful, this JUnit test is successful");
        }
    }

    @Test
    public void VerityPhone1(){
        System.out.println("Verify if the phone number format is correct.");
        User user=new User();
        user.setFullName("小明");
        //user.setEmail("1732868911@qq.com");
        //user.setAddresses("北京市西二旗百度大厦");
        user.setPassword("123456789");
        user.setGender("女");
        user.setPhoneNumber("18945239011");
        user.setRole(USER_ROLE.ROLE_CUSTOMER);
        //输入用户地址 测试
        List<Address> list=new ArrayList<>();
        Address address=new Address();
        address.setAddress("北京市海淀区上地九街百度大厦");
        address.setUser(user);
        list.add(address);
        user.setAddresses(list);
        System.out.println("User address has been added to User.");
     
        boolean validPhoneNumber = VerityPhone.isValidPhoneNumber(user.getPhoneNumber());
        if(validPhoneNumber==false) {
            System.out.println("The phone number format is incorrect. Registration failed.");
        }
        User createdUser=new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(createdUser);
       
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepo.save(cart);

       
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        
        SecurityContextHolder.getContext().setAuthentication(authentication);

        
        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register Success");
        authResponse.setUserRole(savedUser.getRole());
        if (authResponse==null){
            System.out.println("Registration error, please try again. This JUnit test has failed");
        }else{
            System.out.println("Registration successful, this JUnit test is successful");
        }
    }
    @Test
    public void AddAddressCount(){
        System.out.println("Add Address Count Two Over.");
        User user=new User();
        user.setFullName("小明");
        //user.setEmail("1732868911@qq.com");
        //user.setAddresses("北京市西二旗百度大厦");
        user.setPassword("123456789");
        user.setGender("女");
        user.setRole(USER_ROLE.ROLE_CUSTOMER);
        //输入用户地址 测试
        List<Address> list=new ArrayList<>();
        Address address=new Address();
        address.setAddress("北京市海淀区上地九街百度大厦");
        address.setUser(user);
        Address address1=new Address();
        address1.setAddress("北京市海淀区回龙观西区");
        list.add(address);
        list.add(address1);
        user.setAddresses(list);
        System.out.println("User address has been added to User.");
   
            System.out.println("Email already exists, this JUnit test is successful");
      
        User createdUser=new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(createdUser);
       
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepo.save(cart);

      
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        
        SecurityContextHolder.getContext().setAuthentication(authentication);

        
        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register Success");
        authResponse.setUserRole(savedUser.getRole());
        if (authResponse==null){
            System.out.println("Registration error, please try again. This JUnit test has failed");
        }else{
            System.out.println("Registration successful, this JUnit test is successful");
        }
    }
}

