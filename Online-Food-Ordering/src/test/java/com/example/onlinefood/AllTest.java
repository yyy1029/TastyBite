package com.example.onlinefood;

import com.example.onlinefood.model.*;
import com.example.onlinefood.request.IngredientCategoryRequest;
import com.example.onlinefood.request.OrderRequest;
import com.example.onlinefood.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class AllTest {
    @Autowired
    private com.example.onlinefood.service.AddressService AddressService ;

    @Autowired
    private DishService dishService;

    @Autowired
    private MealDealService mealDealService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private IngredientService ingredientService;

    public void test1(){
        Long addressId=1L;
        Address address = AddressService.getAddressById(addressId);
        if (address ==null){
            System.out.println("Failed to get address, please try again");
        }else{
            System.out.println("Successful address acquisition");
        }
    }

    public void test2() throws Exception {
        String jwt="dasdjsaid";
        OrderRequest request=new OrderRequest();
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(request, user);
        if (order==null){
            System.out.println("Failed to get order, please try again");
        }else{
            System.out.println("Order Capture Successful");
        }
    }

    public void test4() throws Exception {
        String jwt="dasdasdasd";
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUserOrder(user.getId());
        if (orders==null){
            System.out.println("Failed to get order, please try again");
        }else{
            System.out.println("Order Capture Successful");
        }
    }

    public void test5() throws Exception {
        String jwt="cjzicjsiad";
        String name="name";
        User user = userService.findUserByJwtToken(jwt);
        List<MealDeal> mealDeals = mealDealService.searchMealDeal(name);
        if(mealDeals.isEmpty()){
            System.out.println("Request failed due to missing dish information, please try again.");
        }else{
            System.out.println("Request for dish information successful");
        }
    }

    public void test6() throws Exception {
        IngredientCategoryRequest request=new IngredientCategoryRequest();
        IngredientCategory item = ingredientService.createIngredientCategory(request.getName());
        if (item==null){
            System.out.println("Incorrect classification, test failed");
        }else{
            System.out.println("Disaggregated data tested successfully");
        }
    }

    public void test7()
    {
        List<IngredientItem> ingredients = ingredientService.findAllIngredients();
        if(ingredients==null){
            System.out.println("All dishes failed the test");
        }else{
            System.out.println("All Categories Tested Successfully");
        }
    }

    public void test8() throws Exception {
        String jwt="dasdasd";
        String name="name";
        User user = userService.findUserByJwtToken(jwt);
        List<Dish> dishes = dishService.searchDish(name);
        if (user==null){
            System.out.println("Dishes query failed, please try again");
        }else{
            System.out.println("Successful dish enquiry");
        }
    }

    public void test9() throws Exception {
        String jwt="dasdassad";
        User user = userService.findUserByJwtToken(jwt);
        Category category=new Category();
        Category existingCategory = categoryService.findCategoryByName(category.getName());
        if (existingCategory != null) {
            
            System.out.println("Category does not exist, please try again");
        }
        Category createdCategory = categoryService.createCategory(category.getName());
        System.out.println("Get Category Success");
    }

    public void test10()
    {
    }

    public void test11()
    {
    }

    public void test12()
    {
    }

    public void test13()
    {
    }

    public void test14()
    {
    }

    public void test15()
    {
    }

}
