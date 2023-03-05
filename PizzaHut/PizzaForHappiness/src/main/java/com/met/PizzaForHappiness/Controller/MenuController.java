package com.met.PizzaForHappiness.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.met.PizzaForHappiness.Dtos.AddMenuItemDto;
import com.met.PizzaForHappiness.Dtos.Response;
import com.met.PizzaForHappiness.Entities.Menu;
import com.met.PizzaForHappiness.Entities.Sizes;
import com.met.PizzaForHappiness.Entities.Variants;
import com.met.PizzaForHappiness.Services.MenuService;
import com.met.PizzaForHappiness.Services.SizesService;
import com.met.PizzaForHappiness.Services.VariantsService;




@CrossOrigin
@RestController
public class MenuController {

	@Autowired	
	private MenuService menuService;

	@Autowired
	private SizesService sizesService;

	@Autowired
	private VariantsService variantService;
	
	@GetMapping("/menu/gelAllMenu")
	public ResponseEntity<?> getAll()
	{
		List<Menu> menu= menuService.findAll();
		if(menu == null)
			return Response.error("Menu not found");
		return Response.success(menu);
	}

	
	// Get Menu Item By Using Id
	@GetMapping("/menu/getMenuById/{id}")
	public ResponseEntity<?> getById(@PathVariable ("id") int id)
	{
		
		Menu menu= menuService.findById(id);
		if(menu == null)
			return Response.error("Menu Not Found");
		return Response.success(menu);
	}

	// add new Menu Item into Database
	@PostMapping("/menu/AddMenuItem")
	public ResponseEntity<?> AddMenuItem(@RequestBody AddMenuItemDto menuItem)
	{
		
		
		
		Menu checkForDuplicateMenu= menuService.findByName(menuItem.getName());
		
		if(checkForDuplicateMenu != null)
		{
			return Response.error("Menu Item Already Present");
		}
		else
		{
			
//			System.out.println(menuItem);
			
			
			
			Menu menu = new Menu();
			menu.setName(menuItem.getName());
			menu.setDescription(menuItem.getDescription());
			menu.setImageAddress(menuItem.getImageAddress());
			menu.setType(menuItem.getType());
			menu.setCategory(menuItem.getCategory());
			Menu newMenuItem= menuService.saveMenuItem(menu);
			System.out.println("item added to database in Menu table= "+ newMenuItem );
			
			
			
			
			
			Sizes size= new Sizes();
			Menu menu1 = new Menu();
			menu1.setMenuId(newMenuItem.getMenuId());
			size.setMenu(menu1);
			size.setSize(menuItem.getSize());
			Sizes savedSize= sizesService.saveSize(size);
			System.out.println("item added to database in Sizes Table = "+ savedSize );
			
			
			Sizes size1= new Sizes();
			size1.setSizeId(savedSize.getSizeId());
			
			Variants variant= new Variants();
			variant.setSize(size1);
			variant.setVariant(menuItem.getVariant());
			variant.setPrice(menuItem.getPrice());
			
			
			
			Variants savedVariant= variantService.saveVariant(variant);
//			System.out.println("Variant saved in database= "+savedVariant);	
			
			
			
			if(savedVariant == null)
				return Response.error("Not Saved");
			return Response.success("successfully added");
		}
		
	//return null;
	}
	
	//delete Menu Item
	@DeleteMapping("/pizzaMenu/delete/{id}")
	public ResponseEntity<?> deletePizza(@PathVariable("id") int id)
	{
	Map<String, Object> result= menuService.deleteMenuItem(id);
	return Response.success(result);
	}
	
	//Update Menu Item
	@PutMapping("/pizzaMenu/updatePizzaInDatabase")
	public ResponseEntity<?> updatePizzaMenu(@RequestBody Menu updatedpizza)
	{
		System.out.println("inserting "+ updatedpizza);
		Menu menu= menuService.updatePizza(updatedpizza);
		if(menu == null)
			return Response.error("Menu not found");
		return Response.success(menu);	
	}
	
	
}
