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

@Table(name = "orderdetails")
@Entity
public class Orderdetails {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int orderDetailsId;
	
	@ManyToOne
	@JoinColumn(name = "orderIdFk")
	private Orders orders;
	
	
	private int variantId;
	private String name;
	private String size;
	private String variant;
	private int price;
	private int quantity;
	private int totalAmount;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(insertable = false)
	private Date createdTimestamp;

	public Orderdetails() {
		super();
	}

	
	public Orderdetails(int orderDetailsId, Orders orders, int variantId, String name, String size, String variant,
			int price, int quantity, int totalAmount) {
		super();
		this.orderDetailsId = orderDetailsId;
		this.orders = orders;
		this.variantId = variantId;
		this.name = name;
		this.size = size;
		this.variant = variant;
		this.price = price;
		this.quantity = quantity;
		this.totalAmount = totalAmount;
	}


	public int getOrderDetailsId() {
		return orderDetailsId;
	}


	public void setOrderDetailsId(int orderDetailsId) {
		this.orderDetailsId = orderDetailsId;
	}


//	public Orders getOrders() {
//		return orders;
//	}


	public void setOrders(Orders orders) {
		this.orders = orders;
	}


	public int getVariantId() {
		return variantId;
	}


	public void setVariantid(int variantId) {
		this.variantId = variantId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
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


	public int getQuantity() {
		return quantity;
	}


	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}


	public int getTotalAmount() {
		return totalAmount;
	}


	public void setTotalAmount(int totalAmount) {
		this.totalAmount = totalAmount;
	}


	@Override
	public String toString() {
		return "Orderdetails [orderDetailsId=" + orderDetailsId + ", orders=" + orders + ", variantId=" + variantId
				+ ", name=" + name + ", size=" + size + ", variant=" + variant + ", price=" + price + ", quantity="
				+ quantity + ", totalAmount=" + totalAmount + ", createdTimestamp=" + createdTimestamp + "]";
	}

	



	
}
