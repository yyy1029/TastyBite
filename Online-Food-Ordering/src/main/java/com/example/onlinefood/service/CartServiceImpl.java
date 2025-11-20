package com.example.onlinefood.service;

import com.example.onlinefood.model.Cart;
import com.example.onlinefood.model.CartItem;
import com.example.onlinefood.model.Dish;
import com.example.onlinefood.model.User;
import com.example.onlinefood.repository.CartItemRepo;
import com.example.onlinefood.repository.CartRepo;
import com.example.onlinefood.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemRepo cartItemRepo;

    @Autowired
    private DishService dishService;

    @Override
    public CartItem addItemToCart(AddCartItemRequest request, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Dish dish = dishService.findDishById(request.getDishId());

        Cart cart = cartRepo.findByCustomerId(user.getId());

        // Check whether the requested dish is already in the shop
        for (CartItem cartItem : cart.getItems()) {

            if (cartItem.getDish().equals(dish)) {

                // The number of new requests plus the number originally in the cart
                int newQuantity = cartItem.getQuantity() + request.getQuantity();

                return updateCartItemQuantity(cartItem.getId(), newQuantity);

            }
        }

        // Reset cart entry cartItem
        CartItem newCartItem = new CartItem();
        newCartItem.setDish(dish);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(request.getQuantity());
        newCartItem.setIngredients(request.getIngredients());
        newCartItem.setTotalPrice(request.getQuantity() * dish.getPrice());

        CartItem savedCartItem = cartItemRepo.save(newCartItem);

        // Add cartItem to cart
        cart.getItems().add(savedCartItem);

        return savedCartItem;

    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {

        // First find all the items in the corresponding shopping cart in the repo
        // according to the requested id
        Optional<CartItem> cartItemOptional = cartItemRepo.findById(cartItemId);

        // If it is empty, the cart entry does not exist (it is new)
        if (cartItemOptional.isEmpty()) {

            throw new Exception("Cart item is not found");

        }

        // Update the number and total price of entries if they exist
        CartItem item = cartItemOptional.get();
        item.setQuantity(quantity);

        // The items in an item must be the same and the total is the item price *
        // number of items
        item.setTotalPrice(item.getDish().getPrice() * quantity);

        return cartItemRepo.save(item);

    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartRepo.findByCustomerId(user.getId());

        // First find all the items in the corresponding shopping cart in the repo
        // according to the requested id
        Optional<CartItem> cartItemOptional = cartItemRepo.findById(cartItemId);

        // If it is empty, the cart entry does not exist (it is new)
        if (cartItemOptional.isEmpty()) {

            throw new Exception("Cart item is not found");

        }

        CartItem item = cartItemOptional.get();

        cart.getItems().remove(item);

        return cartRepo.save(cart);

    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception { // Sum the order item amount in the shopping cart

        Long total = 0L;

        // Multiply and add the price and quantity of each item in the shopping cart
        for (CartItem cartItem : cart.getItems()) {

            total += cartItem.getDish().getPrice() * cartItem.getQuantity();

        }

        return total;

    }

    @Override
    public Cart findCartById(Long id) throws Exception {

        Optional<Cart> optionalCart = cartRepo.findById(id);

        if (optionalCart.isEmpty()) {

            throw new Exception("Cart is not found with this id " + id);

        }

        return optionalCart.get();

    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {

        Cart cart = cartRepo.findByCustomerId(userId);

        cart.setTotal(calculateCartTotals(cart));// Set a total amount before searching the user's shopping cart

        return cart;

    }

    @Override
    public Cart cleanCart(Long useId) throws Exception {

        Cart cart = findCartByUserId(useId);

        cart.getItems().clear();

        return cartRepo.save(cart);

    }

}
