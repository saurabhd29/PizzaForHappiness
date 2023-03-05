package com.met.PizzaForHappiness.Dtos;

import java.util.List;

import com.met.PizzaForHappiness.Entities.*;

public class OrderPlacedDto {
	
private int userId;
private int totalAmount;
private String orderStatus;
private String paymentStatus;
private List<Orderdetails> orderDetails;


public int getUserId() {
	return userId;
}
public void setUserId(int userId) {
	this.userId = userId;
}
public int getTotalAmount() {
	return totalAmount;
}
public void setTotalAmount(int totalAmount) {
	this.totalAmount = totalAmount;
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
public List<Orderdetails> getOrderDetails() {
	return orderDetails;
}
public void setOrderDetails(List<Orderdetails> orderArray) {
	this.orderDetails = orderArray;
}


public OrderPlacedDto(int userId, int totalAmount, String orderStatus, String paymentStatus) {
	super();
	this.userId = userId;
	this.totalAmount = totalAmount;
	this.orderStatus = orderStatus;
	this.paymentStatus = paymentStatus;
	
}


public OrderPlacedDto() {
	
}
@Override
public String toString() {
	return "OrderPlacedDto [userId=" + userId + ", totalAmount=" + totalAmount + ", orderStatus=" + orderStatus
			+ ", paymentStatus=" + paymentStatus + ", orderArray=" + orderDetails + "]";
}







	
	
	

}
