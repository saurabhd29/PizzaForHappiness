package com.sunbeam.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.daos.VariantsDao;
import com.sunbeam.entities.Sizes;
import com.sunbeam.entities.Variants;

@Transactional
@Service
public class VariantsService {

@Autowired	
private VariantsDao variantDao;



//Find particular Variant Using ID
public Variants findVariantById(int id)
{
	System.out.println(id);	
Variants variant= variantDao.findByVariantId(id);
//System.out.println(variant);
return variant;
}




//find list of variants for particular size
public List<Variants> findById (Sizes size)
{

	List<Variants> varn=variantDao.findBySizes(size);
	return varn; 
}
	

//Save Variant in Database
public Variants saveVariant (Variants variant)
{
	
Variants savedVariant= variantDao.save(variant);

return savedVariant;

}



//Delete Variant By Id
public Map<String, Object> deleteVariant(int id)
{
	if(variantDao.existsById(id))
	{
		variantDao.deleteById(id);
		return Collections.singletonMap("affectedRows", 1);
	}
	
		return Collections.singletonMap("affectedRows", 0);
}
	

//Update Variant
public Variants updateVariant(Variants variant)
{
	if(variantDao.existsById(variant.getVariantId()))
	{
		Variants updatedVariant= variantDao.save(variant);
		return updatedVariant;
	}
	
		return null;
	
}





}
