package com.met.PizzaForHappiness.Dtos;

public class OrderStatusUpdate {

	
	private String orderStatus;
	private String paymentStatus;
	
	
	public OrderStatusUpdate() {}
	
	
	public OrderStatusUpdate(String orderStatus, String paymentStatus) {
		super();
		this.orderStatus = orderStatus;
		this.paymentStatus = paymentStatus;
	}


	public String getOrderStatus() {
		return orderStatus;
	}


	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}


	public String getPaymentStatus() {
		return paymentStatus;
	}


	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}


	

	@Override
	public String toString() {
		return "OrderStatusUpdate [orderStatus=" + orderStatus  + ", paymentStatus=" + paymentStatus + "]";
	}
	
	
	
	
	
	
}
