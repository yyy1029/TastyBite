package com.example.onlinefood.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onlinefood.model.Address;
import com.example.onlinefood.model.User;
import com.example.onlinefood.request.AddressRequest;
import com.example.onlinefood.service.AddressService;


@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService AddressService;

    @PostMapping("/{userId}")
    public ResponseEntity<User> addUserAddress(@PathVariable Long userId, 
                                               @RequestBody AddressRequest addressRequest) {

        //Call the AddressService's method to add the address to the user's address list
        User updatedUser = AddressService.addUserAddress(userId, addressRequest);

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    
    }


    @GetMapping("/{userId}")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable Long userId) {

    List<Address> userAddresses = AddressService.getUserAddresses(userId);

    if (userAddresses.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
    }
    return new ResponseEntity<>(userAddresses, HttpStatus.OK);

    }


    @PutMapping("/{addressId}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long addressId,
                                                 @RequestBody Address newAddress) {

    Address existingAddress = AddressService.getAddressById(addressId);

    if (existingAddress == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // Update address information
    existingAddress.setUsername(newAddress.getUsername());
    existingAddress.setAddress(newAddress.getAddress());
    existingAddress.setPostalcode(newAddress.getPostalCode());
    
    Address updatedAddress = AddressService.updateAddress(existingAddress);
    return new ResponseEntity<>(updatedAddress, HttpStatus.OK);

    }


    @DeleteMapping("/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId) {

    Address existingAddress = AddressService.getAddressById(addressId);

    if (existingAddress == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
     
    AddressService.deleteAddress(addressId);
    return ResponseEntity.ok("Address deleted successfully.");

    }

}
