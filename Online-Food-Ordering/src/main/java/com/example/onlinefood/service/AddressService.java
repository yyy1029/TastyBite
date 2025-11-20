package com.example.onlinefood.service;

import java.util.List;

import com.example.onlinefood.model.Address;
import com.example.onlinefood.model.User;
import com.example.onlinefood.request.AddressRequest;


public interface AddressService {

 User addUserAddress(Long userId, AddressRequest addressRequest);

 public List<Address> getUserAddresses(Long userId);

 Address updateAddress(Address address);

 Address getAddressById(Long addressId);

 
 public void deleteAddress(Long addressId);
 
}