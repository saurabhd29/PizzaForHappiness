package com.met.PizzaForHappiness.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.met.PizzaForHappiness.Daos.OrderDetailsDao;
import com.met.PizzaForHappiness.Entities.Orderdetails;


@Transactional
@Service
public class OrderDetailsService {

	@Autowired
	private OrderDetailsDao orderDetailsDao;
	
	public void saveallDetails(Orderdetails detail)
	{
		orderDetailsDao.save(detail);
	}
	
	
	
	
}
