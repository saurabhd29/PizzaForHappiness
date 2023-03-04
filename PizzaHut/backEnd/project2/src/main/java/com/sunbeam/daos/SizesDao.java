package com.sunbeam.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Menu;
import com.sunbeam.entities.Sizes;

public interface SizesDao extends JpaRepository<Sizes, Integer>	 {

	Sizes findBySizeId(int id);
	Sizes findByMenuAndSize(Menu menu, String size);
	
}
