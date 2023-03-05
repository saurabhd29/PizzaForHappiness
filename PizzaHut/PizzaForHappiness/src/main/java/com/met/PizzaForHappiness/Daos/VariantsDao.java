package com.met.PizzaForHappiness.Daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.met.PizzaForHappiness.Entities.Sizes;
import com.met.PizzaForHappiness.Entities.Variants;

public interface VariantsDao  extends JpaRepository<Variants, Integer>  {
	List<Variants> findBySizes(Sizes size);
	Variants findByVariantId(int id);
}
