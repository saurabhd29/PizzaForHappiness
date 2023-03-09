package com.met.PizzaForHappiness.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.met.PizzaForHappiness.Daos.OrdersDao;
import com.met.PizzaForHappiness.Entities.Orders;
import com.met.PizzaForHappiness.Entities.User;

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
	
	
	public int getTotalAmount()
	{
		
		List<Orders> orders= ordersDao.findAll();
		Orders tot;
		int t=0;
		for(int i=0; i<orders.size(); i++) {		
			tot = orders.get(i);
			if(tot.getOrderStatus().equalsIgnoreCase("delivered"))
			{
				t= t + tot.getTotalAmount();
			}
			
		}
		return t;
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
