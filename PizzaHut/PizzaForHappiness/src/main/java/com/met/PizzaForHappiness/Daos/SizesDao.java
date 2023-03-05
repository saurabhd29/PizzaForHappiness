package com.met.PizzaForHappiness.Daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.met.PizzaForHappiness.Entities.Menu;
import com.met.PizzaForHappiness.Entities.Sizes;

public interface SizesDao extends JpaRepository<Sizes, Integer>	 {

	Sizes findBySizeId(int id);
	Sizes findByMenuAndSize(Menu menu, String size);
}
