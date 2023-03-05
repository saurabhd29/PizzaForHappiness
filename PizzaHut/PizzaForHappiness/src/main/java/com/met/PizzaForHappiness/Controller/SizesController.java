package com.met.PizzaForHappiness.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.met.PizzaForHappiness.Dtos.AddSizeDto;
import com.met.PizzaForHappiness.Dtos.Response;
import com.met.PizzaForHappiness.Entities.Menu;
import com.met.PizzaForHappiness.Entities.Sizes;
import com.met.PizzaForHappiness.Entities.Variants;
import com.met.PizzaForHappiness.Services.SizesService;
import com.met.PizzaForHappiness.Services.VariantsService;

@CrossOrigin( origins= "*" )
@RestController
public class SizesController {

	@Autowired
	private SizesService sizeService;
	@Autowired
	private VariantsService variantsService;
	
	
	
	
	
	//getSizeById
	@GetMapping("/sizes/getSizeById/{id}")
	public ResponseEntity<?> getSizeById(@PathVariable("id") int id)
	{
		Sizes size= sizeService.findSizeById(id);
		if(size== null)
			return Response.error("size not found");
		return Response.success(size);
	}
	
	
	
	
	
	
	// save new size in Database
	@PostMapping("/sizes/addSizeInDatabase/")
	public ResponseEntity<?> addSizeInDatabase(@RequestBody AddSizeDto newSize)
	{
		System.out.println(newSize);
		
		Menu newMenu= new Menu();
		newMenu.setMenuId(newSize.getMenuId());
		
		Sizes checkIfAlreadyExists= sizeService.findByMenuAndSize(newMenu, newSize.getSize());
		
		System.out.println("already exists="+checkIfAlreadyExists);
		
		if(checkIfAlreadyExists==null)
		{
			
			Menu menu= new Menu();
			menu.setMenuId(newSize.getMenuId());
			
			Sizes sizeObj= new Sizes();
			sizeObj.setMenu(menu);
			sizeObj.setSize(newSize.getSize());
			
			Sizes sizeAddedInDatabase= sizeService.saveNewSize(sizeObj);
			System.out.println(sizeAddedInDatabase);
			
			if(sizeAddedInDatabase==null)
				return Response.error("error while adding in database");
			else
			{
				Sizes sizeId= new Sizes();
				sizeId.setSizeId(sizeAddedInDatabase.getSizeId());
				
				Variants variant= new Variants();
				variant.setSize(sizeId);
				variant.setVariant(newSize.getVariant());
				variant.setPrice(newSize.getPrice());
				Variants variantAddedInDatabase= variantsService.saveVariant(variant);
				
				if(variantAddedInDatabase==null)
					return Response.error("Error while Adding");
				return Response.success("Successfully Added In Database");							
			}						
		}
		
		else
		{
			return Response.error("Size Already Exists in Database");	
		}
		
	}
	
	
	
	
	
	
	
	
	
	//Delete Size From Database
	//delete Menu Item
	@DeleteMapping("/sizes/delete/{id}")
	public ResponseEntity<?> deleteSize(@PathVariable("id") int id)
	{		
	Map<String, Object> result= sizeService.deleteSize(id);
	return Response.success(result);
		
	}
	
}
