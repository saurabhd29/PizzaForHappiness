package com.met.PizzaForHappiness.Daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.met.PizzaForHappiness.Entities.Orderdetails;

public interface OrderDetailsDao extends JpaRepository<Orderdetails, Integer> {

}
