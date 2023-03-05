package com.met.PizzaForHappiness.Dtos;

public class AddSizeDto {
	
	private int menuId;
	private String size;
	private String variant;
	private int price;
	
	
	
	public AddSizeDto() {}
	
	
	public AddSizeDto(int menuId, String size, String variant, int price) {
		super();
		this.menuId = menuId;
		this.size = size;
		this.variant = variant;
		this.price = price;
	}


	public int getMenuId() {
		return menuId;
	}


	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}


	public String getSize() {
		return size;
	}


	public void setSize(String size) {
		this.size = size;
	}


	public String getVariant() {
		return variant;
	}


	public void setVariant(String variant) {
		this.variant = variant;
	}


	public int getPrice() {
		return price;
	}


	public void setPrice(int price) {
		this.price = price;
	}


	@Override
	public String toString() {
		return "AddSizeDto [menuId=" + menuId + ", size=" + size + ", variant=" + variant + ", price=" + price + "]";
	}
	
	
	
	
	
	
	
	
	
	

}
