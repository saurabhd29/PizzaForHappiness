package com.sunbeam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dtos.OrderPlacedDto;
import com.sunbeam.dtos.OrderStatusUpdate;
import com.sunbeam.dtos.Response;
import com.sunbeam.entities.Orderdetails;
import com.sunbeam.entities.Orders;
import com.sunbeam.entities.User;
import com.sunbeam.service.EmailService;
import com.sunbeam.service.OrderDetailsService;
import com.sunbeam.service.OrdersService;
import com.sunbeam.service.UserService;

@CrossOrigin(origins = "*")
@RestController
public class OrdersController {

	@Autowired
	private OrdersService ordersService;

	@Autowired
	private OrderDetailsService orderDetailsService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private EmailService emailService;

/// get all the orders placed
	@GetMapping("/orders/getAllOrders")
	ResponseEntity<?> gelAll() {

		List<Orders> orders = ordersService.getAllOrders();

//System.out.println(orders);	
		if (orders == null)
			return Response.error("Orders not found");
		return Response.success(orders);

	}

	// without cascade it is working perfectly

	@PostMapping("/orders/placeOrder")
	ResponseEntity<?> placeOrder(@RequestBody OrderPlacedDto orderPlaced)
	{
		User newUser = userService.findUserById(orderPlaced.getUserId());
	
		Orders order = new Orders();
		order.setUser(newUser);
		order.setTotalAmount(orderPlaced.getTotalAmount());
		order.setOrderStatus(orderPlaced.getOrderStatus());
		order.setPaymentStatus(orderPlaced.getPaymentStatus());
		Orders placedOrderDetails = ordersService.save(order);
		
		if(placedOrderDetails != null) {
			emailService.sendEmailForNewOrder(newUser.getEmail() , orderPlaced.getTotalAmount());

			int placedorderId = placedOrderDetails.getOrderId();

			System.out.println("placed Order Id= ");
			System.out.println(placedorderId);

			if (placedorderId != 0) {

				Orders orderId = new Orders();
				orderId.setOrderId(placedorderId);

			System.out.println(orderPlaced);
				List<Orderdetails> orderDetails1 = orderPlaced.getOrderDetails();
				int count = 0;
				for (int i = 0; i < orderDetails1.size(); i++) {
					Orderdetails order2 = orderDetails1.get(i);
					order2.setOrders(orderId);
					orderDetailsService.saveallDetails(order2);
					count++;

				}

				for (int i = 0; i < orderDetails1.size(); i++) {
					Orderdetails order2 = orderDetails1.get(i);
					System.out.println(order2);
				}

				System.out.println(count);
				return Response.success(null);

			}
		}		
		return Response.error("Orders not placed");

	}

	/*
	 * // with cascade working but not adding foreign key in orderdetalls table it
	 * shows null some
	 * 
	 * @PostMapping("/orders/placeOrder") ResponseEntity<?> placeOrder(@RequestBody
	 * OrderPlacedDto orderPlaced ) //ResponseEntity<?> placeOrder(@RequestBody int
	 * id ) { User newUser= new User(); newUser.setUserId(orderPlaced.getUserId());
	 * 
	 * Orders order= new Orders(); order.setUser(newUser);
	 * order.setTotalAmount(orderPlaced.getTotalAmount());
	 * order.setOrderStatus(orderPlaced.getOrderStatus());
	 * order.setPaymentStatus(orderPlaced.getPaymentStatus());
	 * order.setOrderDetails(orderPlaced.getOrderDetails()); Orders
	 * placedOrderDetails= ordersService.save(order); if(placedOrderDetails == null)
	 * return Response.error("Orders not found"); return
	 * Response.success("Orer placed Successfully"); }
	 * 
	 */

// Update Order Status to accepted/other by CoAdmin
	@PatchMapping("/orders/acceptOrder/{orderId}")
	ResponseEntity<?> updateOrderStatus(@PathVariable("orderId") int orderId,
			@RequestBody OrderStatusUpdate updateOrder) {
		System.out.println(updateOrder);
		System.out.println(orderId);

		Orders ifExist = ordersService.findById(orderId);
		if (ifExist != null) {
			User user = ifExist.getUser();
			ifExist.setOrderStatus(updateOrder.getOrderStatus());
			if (updateOrder.getPaymentStatus() != null) {
				ifExist.setPaymentStatus(updateOrder.getPaymentStatus());
			}
			System.out.println("ifExist=" + ifExist);

			Orders updatedOrder = ordersService.save(ifExist);
			if (updatedOrder == null)
			{
				return Response.error("Orders not found");
			}
			if(updateOrder.getOrderStatus().equals("accepted"))
			emailService.sendEmailForAcceptOrder(user.getEmail());
			if(updateOrder.getOrderStatus().equals("delivered"))
			emailService.sendEmailForOrderDelivered(user.getEmail());
			return Response.success(updatedOrder);

		}

		return Response.error("not found");

	}

	@GetMapping("/orders/userOrderById/{userId}")
	public ResponseEntity<?> userOrders(@PathVariable("userId") int userId) {
		List<Orders> orders = ordersService.getUserOrders(userId);

		// System.out.println(orders);
		if (orders == null)
			return Response.error("Orders not found");
		return Response.success(orders);

//	return null;
	}

}
