package com.sunbeam.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Orderdetails;


public interface OrderDetailsDao extends JpaRepository<Orderdetails, Integer> {
	

}
