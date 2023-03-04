package com.sunbeam.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Orders;
import com.sunbeam.entities.User;

public interface OrdersDao extends JpaRepository<Orders, Integer>  {

	Orders findByOrderId(int orderId);
	List<Orders> findByUser (User user);
	
}

