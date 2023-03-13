package com.met.PizzaForHappiness.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.met.PizzaForHappiness.Dtos.OrderPlacedDto;
import com.met.PizzaForHappiness.Dtos.OrderStatusUpdate;
import com.met.PizzaForHappiness.Dtos.Response;
import com.met.PizzaForHappiness.Entities.Orderdetails;
import com.met.PizzaForHappiness.Entities.Orders;
import com.met.PizzaForHappiness.Entities.User;
import com.met.PizzaForHappiness.Services.EmailService;
import com.met.PizzaForHappiness.Services.OrderDetailsService;
import com.met.PizzaForHappiness.Services.OrdersService;
import com.met.PizzaForHappiness.Services.UserService;

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
	
	@RequestMapping("/handle")
	 public ResponseEntity<String> handle() {
	   
	   return new ResponseEntity<String>("Hello World", HttpStatus.CREATED);
	 }
	
	@GetMapping("/orders/getTotalAmount")
	ResponseEntity<String> getTotalAmount() {

		int torders = ordersService.getTotalAmount();
		
		String t =String.valueOf(torders);
			System.out.println(t);	
		
		return new ResponseEntity<String>(t, HttpStatus.OK);

	}

	// without cascade it is working perfectly

	@PostMapping("/orders/placeOrder")
	ResponseEntity<?> placeOrder(@RequestBody OrderPlacedDto orderPlaced)
	{
		int count = 0;
		String item = null;
		
		User newUser = userService.findUserById(orderPlaced.getUserId());
		List<Orderdetails> orderDetails1 = orderPlaced.getOrderDetails();
		Orderdetails orderItem = orderDetails1.get(0);
		item =  orderItem.getName();
		for (int i = 1; i < orderDetails1.size(); i++) {
			Orderdetails orderItem1 = orderDetails1.get(i);
			item = item + " , "+ orderItem1.getName();
					
		}
				
		Orders order = new Orders();
		order.setUser(newUser);
		order.setItems(item);
		order.setTotalAmount(orderPlaced.getTotalAmount());
		order.setOrderStatus(orderPlaced.getOrderStatus());
		order.setPaymentStatus(orderPlaced.getPaymentStatus());
		Orders placedOrderDetails = ordersService.save(order);
		
		if(placedOrderDetails != null) {
			

			int placedorderId = placedOrderDetails.getOrderId();
			emailService.sendEmailForNewOrder(newUser.getEmail() , orderPlaced.getTotalAmount(),placedorderId);
			System.out.println("placed Order Id= ");
			System.out.println(placedorderId);

			if (placedorderId != 0) {

				Orders orderId = new Orders();
				orderId.setOrderId(placedorderId);

			System.out.println(orderPlaced);
				
				
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
			{
				emailService.sendEmailForAcceptOrder(user.getEmail(),orderId);
				emailService.sendEmailManagerForAcceptOrder(orderId);
				emailService.sendEmailForDelivery();
			}
			
			if(updateOrder.getOrderStatus().equals("delivered"))
			{
				emailService.sendEmailForOrderDelivered(user.getEmail(),orderId);
				emailService.sendEmailManagerForOrderDelivered(orderId);
			}
			
		return Response.success(updatedOrder);

		}

		return Response.error("not found");

	}
	
	@PatchMapping("/orders/denyOrder/{orderId}")
	ResponseEntity<?> denyOrderStatus(@PathVariable("orderId") int orderId,
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
			if(updateOrder.getOrderStatus().equals("Denied"))
			emailService.sendEmailForDeniedOrder(user.getEmail(), orderId);
		
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
