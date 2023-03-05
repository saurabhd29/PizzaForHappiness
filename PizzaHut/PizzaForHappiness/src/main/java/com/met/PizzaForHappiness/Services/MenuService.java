package com.met.PizzaForHappiness.Services;


import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.met.PizzaForHappiness.Daos.MenuDao;
import com.met.PizzaForHappiness.Entities.Menu;



@Transactional
@Service
public class MenuService {
	
		@Autowired	
		private MenuDao menuDao;
		
		
		
		
		//Get all Menu Items
		public List<Menu> findAll()
		{
		List<Menu> Entiremenu= menuDao.findAll();
		return Entiremenu;
		}
		
		
		
		public Menu saveMenuItem(Menu menu)
		{
		
		Menu newMenu= menuDao.save(menu);
		return newMenu;
		
		}
		
		
		public Menu findByName( String name )
		{
			
		Menu menu= menuDao.findByName(name);
		return menu;
		}
		
		
		
		
		//Delete menu Item by using Id
		public Map<String, Object> deleteMenuItem(int id)
		{
			if(menuDao.existsById(id))
			{
				menuDao.deleteById(id);
				return Collections.singletonMap("affectedRows", 1);
			}
			
				return Collections.singletonMap("affectedRows", 0);
		}
		
		
		
		// Find menu Item By Id
		public Menu findById(int id)
		{
			Menu menu= menuDao.findByMenuId(id);
			return menu;
		
		
		}
		
		
		
		//Update Pizza
		public Menu updatePizza(Menu menu)
		{
			if(menuDao.existsById(menu.getMenuId()))
			{
				Menu updatedmenu= menuDao.save(menu);
				
				return updatedmenu;
			}
			
				return null;
			
		}
		



}

