package com.met.PizzaForHappiness.Dtos;

public class AddVariantDto {
	
	 private int sizeId;
     private String variant;
     private int price;
	
     
     public AddVariantDto() {}
     
     public AddVariantDto(int sizeId, String variant, int price) {
		super();
		this.sizeId = sizeId;
		this.variant = variant;
		this.price = price;
	}

	public int getSizeId() {
		return sizeId;
	}

	public void setSizeId(int sizeId) {
		this.sizeId = sizeId;
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
		return "AddVariantDto [sizeId=" + sizeId + ", variant=" + variant + ", price=" + price + "]";
	}
     
     
     
     

}
