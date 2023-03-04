package com.sunbeam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.daos.OrdersDao;
import com.sunbeam.entities.Orders;
import com.sunbeam.entities.User;

@Transactional
@Service
public class OrdersService {

	@Autowired
	private OrdersDao ordersDao;
	
	
	public Orders findById(int id)
	{
		Orders order= ordersDao.findByOrderId(id);
		return order;
	}
	
	public List<Orders> getAllOrders()
	{
		
		List<Orders> orders= ordersDao.findAll();
		return orders;
	}
	
	
	
	public Orders save(Orders order)
	{
		Orders placedOrderDetails= ordersDao.save(order);
		return placedOrderDetails;
		
	}
	
	
	
	public List<Orders> getUserOrders (int userId)
	{
		
		User user= new User();
		user.setUserId(userId);
		
		List<Orders> userOrders= ordersDao.findByUser(user);
		
		
		return userOrders;
		
	}
	
	
	
	
	
	
	
}
