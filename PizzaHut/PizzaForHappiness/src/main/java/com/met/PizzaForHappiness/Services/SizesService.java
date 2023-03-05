package com.met.PizzaForHappiness.Services;



import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.met.PizzaForHappiness.Daos.SizesDao;
import com.met.PizzaForHappiness.Entities.Menu;
import com.met.PizzaForHappiness.Entities.Sizes;


@Transactional
@Service
public class SizesService {
	
	@Autowired
	private SizesDao sizeDao;
	
	
	//find size by using id needed for front end

	public Sizes findSizeById(int id )
	{

		Sizes size= sizeDao.findBySizeId(id);	
		return size;
	}
	
	
	public Sizes saveSize (Sizes size)
	{
		
		Sizes newSize= sizeDao.save(size);
		return newSize;
	}
	
	
	
	
	//check if input size fron frontend already exists or not
	public Sizes findByMenuAndSize(Menu menu, String size)
	{
		
		Sizes size1= sizeDao.findByMenuAndSize(menu, size);
		return size1;
		
	}
	
	
	
	// save new size in database
	
	public Sizes saveNewSize(Sizes size)
	{
		
		Sizes savedSize= sizeDao.save(size);
		return savedSize;
	}
	
	
	
	//Delete Size by using Id
	public Map<String, Object> deleteSize(int id)
	{
		if(sizeDao.existsById(id))
		{
			sizeDao.deleteById(id);
			return Collections.singletonMap("affectedRows", 1);
		}
		
			return Collections.singletonMap("affectedRows", 0);
	}
	

}
