package com.met.PizzaForHappiness.Entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;



@Entity
@Table(name = "variants")
public class Variants {

@GeneratedValue(strategy = GenerationType.IDENTITY)	
@Id
private int variantId;	

@ManyToOne
@JoinColumn(name = "sizeIdFk")
private Sizes sizes;

private String variant;
private int price;

@Temporal(TemporalType.TIMESTAMP)
@Column(insertable = false)
private Date createdTimestamp;





public Variants() {}


public Variants(int variantId, Sizes sizes, String variant, int price, Date createdTimestamp) {
	super();
	this.variantId = variantId;
	this.sizes = sizes;
	this.variant = variant;
	this.price = price;
	this.createdTimestamp = createdTimestamp;
}






public int getVariantId() {
	return variantId;
}


public void setVariantId(int variantId) {
	this.variantId = variantId;
}


//public Size getSize() {
//	return size;
//}


public void setSize(Sizes sizes) {
	this.sizes = sizes;
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


public Date getCreatedTimestamp() {
	return createdTimestamp;
}


public void setCreatedTimestamp(Date createdTimestamp) {
	this.createdTimestamp = createdTimestamp;
}


@Override
public String toString() {
	return "Variants [variantId=" + variantId + ", variant=" + variant + ", price=" + price + "]";
}


//public List<Orderdetails> getOrderDetails() {
//	return orderDetails;
//}
//
//
//public void setOrderDetails(List<Orderdetails> orderDetails) {
//	this.orderDetails = orderDetails;
//}









// there is some issue with tpString when tried to Print  syso(variant) --> giving some error
//@Override
//public String toString() {
//	return "Variants [variantId=" + variantId + ", sizes=" + sizes + ", variant=" + variant + ", price=" + price
//			+ ", createdTimestamp=" + createdTimestamp + "]";
//}












	
}
