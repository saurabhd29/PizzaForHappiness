package com.sunbeam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

		@Autowired
		 private JavaMailSender emailSender;

		 public void sendEmailForNewOrder(String email , int totalAmount) {
			SimpleMailMessage message = new SimpleMailMessage(); 
	      message.setFrom("bachalswapnil@gmail.com");
	      message.setTo(email); 
	      message.setSubject("Order Placed Successfully !"); 
	      message.setText("Your Order has been placed and it will be delivered within 30 min , plz pay the Rs." + totalAmount + " at delivery in cash . Thank You for Choosing Us!");
	      emailSender.send(message);
	}
		 
		 public void sendEmailForAcceptOrder(String email) {
				SimpleMailMessage message = new SimpleMailMessage(); 
		      message.setFrom("bachalswapnil@gmail.com");
		      message.setTo(email); 
		      message.setSubject("Order Accepted."); 
		      message.setText("Your Order has been accepted By PizzaHut");
		      emailSender.send(message);
		}
		 
		 public void sendEmailForDelivery(String userEmail) {
			 
			 //delivery person
				SimpleMailMessage message = new SimpleMailMessage(); 
		      message.setFrom("bachalswapnil@gmail.com");
		      message.setTo("bachalswapnil@gmail.com"); 
		      message.setSubject("Pick-up."); 
		      message.setText("Please pick-up the order and deliver it to user .");
		      emailSender.send(message);
		      
		}
		 
		 public void sendEmailForOrderDelivered(String email) {
				SimpleMailMessage message = new SimpleMailMessage(); 
		      message.setFrom("bachalswapnil@gmail.com");
		      message.setTo(email); 
		      message.setSubject("Delivered ."); 
		      message.setText("Your order is delivered");
		      emailSender.send(message);
		}
}
