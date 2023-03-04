package com.sunbeam.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Sizes;
import com.sunbeam.entities.Variants;

public interface VariantsDao extends JpaRepository<Variants, Integer> {
	
//	List<Variants> findBySizeIdFk(int id);
	
	List<Variants> findBySizes(Sizes size);
	Variants findByVariantId(int id);
}
