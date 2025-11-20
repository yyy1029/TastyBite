package com.example.onlinefood.repository;

import com.example.onlinefood.model.Sales;
import com.example.onlinefood.response.OrderSalaryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderSalaryRepo extends JpaRepository<Sales, Long> {

    @Query(value = "SELECT MONTH(finish_date) AS finishDate,\n" +
            "    SUM(order_num) AS totalNum,\n" +
            "    SUM(price) AS totalPrice\n" +
            "    FROM sales\n" +
            "    GROUP BY MONTH(finish_date)\n" +
            "    ORDER BY month", nativeQuery = true)

    public List<OrderSalaryResponse> selectByMonth();

}
