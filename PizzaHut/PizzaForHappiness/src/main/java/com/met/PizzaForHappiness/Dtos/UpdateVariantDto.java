package com.met.PizzaForHappiness.Dtos;

public class UpdateVariantDto {
	
	 private int sizeId;
     private int variantId;
     private String variant;
     private int price;
	
     public UpdateVariantDto() {}
     
     public UpdateVariantDto(int sizeId, int variantId, String variant, int price) {
		super();
		this.sizeId = sizeId;
		this.variantId = variantId;
		this.variant = variant;
		this.price = price;
	}

	public int getSizeId() {
		return sizeId;
	}

	public void setSizeId(int sizeId) {
		this.sizeId = sizeId;
	}

	public int getVariantId() {
		return variantId;
	}

	public void setVariantId(int variantId) {
		this.variantId = variantId;
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
		return "UpdateVariantDto [sizeId=" + sizeId + ", variantId=" + variantId + ", variant=" + variant + ", price="
				+ price + "]";
	}
     
     
     
     
	

}
