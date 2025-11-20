package com.example.onlinefood.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.onlinefood.model.Address;
import com.example.onlinefood.model.User;
import com.example.onlinefood.repository.AddressRepo;
import com.example.onlinefood.repository.UserRepo;
import com.example.onlinefood.request.AddressRequest;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepository;

    @Autowired
    private UserRepo userRepo;
    
    @Override
    public User addUserAddress(Long userId, AddressRequest addressRequest) {

    //Get User
    Optional<User> userOptional = userRepo.findById(userId);
    User user = userOptional.orElseThrow(() -> new RuntimeException("User not found"));

    //Create a new address object
    Address newAddress = new Address();
    newAddress.setAddress(addressRequest.getAddress());
    newAddress.setUsername(addressRequest.getUsername());
    newAddress.setPostalcode(addressRequest.getPostalcode());
    
    //Set the user corresponding to the address
    newAddress.setUser(user);

    //Add the address to the user's address list
    user.addAddress(newAddress);

    //Save user
    return userRepo.save(user);

    }

    @Override
    public List<Address> getUserAddresses(Long userId) {

    return addressRepository.findByUserId(userId);

    }

    @Override
    public Address updateAddress(Address address) {

        return addressRepository.save(address);

    }
   
    @Override
    public Address getAddressById(Long addressId) {

        return addressRepository.findById(addressId).orElse(null);

    }

    @Override
    public void deleteAddress(Long addressId) {
  
    addressRepository.deleteById(addressId);

    }
    
}
