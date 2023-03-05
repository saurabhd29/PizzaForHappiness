package com.met.PizzaForHappiness.Entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "orders")
public class Orders {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int orderId;

	@ManyToOne
	@JoinColumn(name = "userIdFk")
	private User user;

	private int totalAmount;
	private String orderStatus;
	private String paymentStatus;
	private String items;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(insertable = false)
	private Date createdTimestamp;

	@OneToMany(mappedBy = "orders", cascade = { CascadeType.ALL })
	// cascade={CascadeType.ALL}===> added to save all order details at once but
	// could not save fk in orderdetails table in new
	// controller look into it
//	@OneToMany (mappedBy = "orders")
	List<Orderdetails> orderDetails;

	public Orders() {
		super();
	}

	public Orders(int orderId, User user, int totalAmount, String orderStatus, String paymentStatus,
			List<Orderdetails> orderDetails) {
		super();
		this.orderId = orderId;
		this.user = user;
		this.totalAmount = totalAmount;
		this.orderStatus = orderStatus;
		this.paymentStatus = paymentStatus;
		this.orderDetails = orderDetails;
	}

	public Orders(int orderId, User user, int totalAmount, String orderStatus, String paymentStatus) {
		super();
		this.orderId = orderId;
		this.user = user;
		this.totalAmount = totalAmount;
		this.orderStatus = orderStatus;
		this.paymentStatus = paymentStatus;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public void setOrderDetails(List<Orderdetails> orderDetails) {
		this.orderDetails = orderDetails;
	}
	
	


	public String getItems() {
		return items;
	}

	public void setItems(String items) {
		this.items = items;
	}
	
	
	

	@Override
	public String toString() {
		return "Orders [orderId=" + orderId + ", totalAmount=" + totalAmount + ", orderStatus=" + orderStatus
				+ ", paymentStatus=" + paymentStatus + "]";
	}

}
