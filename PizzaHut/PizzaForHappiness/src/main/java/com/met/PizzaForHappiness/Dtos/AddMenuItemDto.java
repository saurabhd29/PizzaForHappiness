package com.met.PizzaForHappiness.Dtos;


public class AddMenuItemDto {
	
	private String  name;
	private String  description;
	private String  imageAddress;
	private String  type;
	private String  category;
	private String size;
	private String variant;
	private int price;
	
	
	
	
	public AddMenuItemDto() {}




	public AddMenuItemDto(String name, String description, String imageAddress, String type, String category,
			String size, String variant, int price) {
		super();
		this.name = name;
		this.description = description;
		this.imageAddress = imageAddress;
		this.type = type;
		this.category = category;
		this.size = size;
		this.variant = variant;
		this.price = price;
	}




	public String getName() {
		return name;
	}




	public void setName(String name) {
		this.name = name;
	}




	public String getDescription() {
		return description;
	}




	public void setDescription(String description) {
		this.description = description;
	}




	public String getImageAddress() {
		return imageAddress;
	}




	public void setImageAddress(String imageAddress) {
		this.imageAddress = imageAddress;
	}




	public String getType() {
		return type;
	}




	public void setType(String type) {
		this.type = type;
	}




	public String getCategory() {
		return category;
	}




	public void setCategory(String category) {
		this.category = category;
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
		return "AddMenuItemDto [name=" + name + ", description=" + description + ", imageAddress=" + imageAddress
				+ ", type=" + type + ", category=" + category + ", size=" + size + ", variant=" + variant + ", price="
				+ price + "]";
	}
	
	
	
	
	
	
	
	
	
	

}
