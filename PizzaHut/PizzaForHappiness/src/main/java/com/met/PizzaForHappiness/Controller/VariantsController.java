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

import com.met.PizzaForHappiness.Dtos.AddVariantDto;
import com.met.PizzaForHappiness.Dtos.Response;
import com.met.PizzaForHappiness.Dtos.UpdateVariantDto;
import com.met.PizzaForHappiness.Entities.Sizes;
import com.met.PizzaForHappiness.Entities.Variants;
import com.met.PizzaForHappiness.Services.VariantsService;

@CrossOrigin(origins = "*")
@RestController
public class VariantsController {

	@Autowired
	private VariantsService variantService;
	
	
	//
	
	
	
	// get list of Variants of Particular Size
	@GetMapping("/variants/getById/{id}")
	public ResponseEntity<?> getById(@PathVariable("id") int id)
	{
		Sizes size= new Sizes();
		size.setSizeId(id);
		List<Variants> menu= variantService.findById(size);
		
		if(menu == null)
			return Response.error("pizzas not found");
		return Response.success(menu);
	}




	//getVariantById
	@GetMapping("/variants/getVariantById/{id}")
	public ResponseEntity<?> getVariantById(@PathVariable("id") int id)
	{
		System.out.println("variant Controller");
		System.out.println(id);
		System.out.println(id);
		Variants variant= variantService.findVariantById(id);
//		System.out.println("Variant Controller"+ variant);
		
		if(variant== null)
			return Response.error("variant not found");
		return Response.success(variant);
	}
	
		
	//delete Variant
	@DeleteMapping("/variants/delete/{id}")
	public ResponseEntity<?> deletePizza(@PathVariable("id") int id)
	{
		
	Map<String, Object> result= variantService.deleteVariant(id);
	return Response.success(result);
		
	}
	
	//Update Variant
	@PutMapping("/variants/update")
	public ResponseEntity<?> updatePizzaMenu(@RequestBody UpdateVariantDto variant)
	{
		System.out.println("inserting "+ variant);
		
		Sizes size= new Sizes();
		size.setSizeId(variant.getSizeId());
		
		
		Variants updateVariant = new Variants();
		
		updateVariant.setSize(size);
		updateVariant.setVariant(variant.getVariant());
		updateVariant.setPrice(variant.getPrice());
		updateVariant.setVariantId(variant.getVariantId());
		
		System.out.println("updateVariant"+updateVariant);
		
		Variants updatedVariant= variantService.updateVariant(updateVariant);
		System.out.println("updatedVariant"+updateVariant);
		if(updatedVariant== null)
			return Response.error("variant not found");
		return Response.success(variant);
				
	}
	
	
	// add new Variant in Database
	@PostMapping("/variants/AddNewVariant")
	public ResponseEntity<?> AddMenuItem(@RequestBody AddVariantDto newVariant)
	{
		Sizes size= new Sizes();
		size.setSizeId(newVariant.getSizeId());
		
		Variants variant= new Variants();
		variant.setSize(size);
		variant.setPrice(newVariant.getPrice());
		variant.setVariant(newVariant.getVariant());
		
		Variants variantAdded= variantService.saveVariant(variant);
		if(variantAdded== null)
			return Response.error("variant not Added in Database");
		return Response.success(variantAdded);

	}
}
