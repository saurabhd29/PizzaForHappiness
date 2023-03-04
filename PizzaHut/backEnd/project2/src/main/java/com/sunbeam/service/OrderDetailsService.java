package com.sunbeam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.daos.OrderDetailsDao;
import com.sunbeam.entities.Orderdetails;


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
