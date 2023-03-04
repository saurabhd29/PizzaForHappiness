package com.sunbeam.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Menu;


public interface MenuDao extends JpaRepository<Menu, Integer> {
	
	Menu  findByName (String name);
	Menu findByMenuId (int id);
	
	
}
