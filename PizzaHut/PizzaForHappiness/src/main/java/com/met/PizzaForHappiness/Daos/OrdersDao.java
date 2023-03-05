package com.met.PizzaForHappiness.Daos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.met.PizzaForHappiness.Entities.Orders;
import com.met.PizzaForHappiness.Entities.User;



public interface OrdersDao extends JpaRepository<Orders, Integer> {
	
	Orders findByOrderId(int orderId);
	List<Orders> findByUser (User user);
}
