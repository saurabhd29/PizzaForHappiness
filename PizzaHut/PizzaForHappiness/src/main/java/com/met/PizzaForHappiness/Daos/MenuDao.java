package com.met.PizzaForHappiness.Daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.met.PizzaForHappiness.Entities.Menu;

public interface MenuDao extends JpaRepository<Menu, Integer> {

	Menu  findByName (String name);
	Menu findByMenuId (int id);
	
}
