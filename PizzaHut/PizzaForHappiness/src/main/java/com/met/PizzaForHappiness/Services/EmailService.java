package com.met.PizzaForHappiness.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

		@Autowired
		 private JavaMailSender emailSender;

		 public void sendEmailForNewOrder(String email , int totalAmount, int orderid) {
			SimpleMailMessage message = new SimpleMailMessage(); 
	      message.setFrom("pizzaforhappiness@gmail.com");
	      message.setTo(email); 
	      message.setSubject("Order No "+ orderid +" Placed Successfully !"); 
	      message.setText("Your Order No "+ orderid +" with Rs " + totalAmount + " has been placed and it will be delivered within 30 min. Thank You for Choosing Us!");
	      emailSender.send(message);
	}
		 			
		 public void sendEmailForAcceptOrder(String email, int orderId) {
				SimpleMailMessage message = new SimpleMailMessage(); 
		      message.setFrom("pizzaforhappiness@gmail.com");
		      message.setTo(email); 
		      message.setSubject("Order No "+orderId+" Accepted."); 
		      message.setText("Your Order No "+orderId+" has been accepted By PizzaHut");
		      emailSender.send(message);
		}
		 //sendEmailForDeniedOrder
		 public void sendEmailForDeniedOrder(String email, int orderId) {
				SimpleMailMessage message = new SimpleMailMessage(); 
		      message.setFrom("pizzaforhappiness@gmail.com");
		      message.setTo(email); 
		      message.setSubject("Order No "+orderId+" denied."); 
		      message.setText("Unfortunately your Order No "+orderId+" has been cancelled By Pizza.\n Inconvience caused is highly regretted"
		      		+ "\n\n Contact our customer care Sujit at 139");
		      emailSender.send(message);
		}
		 
		 
		 public void sendEmailForDelivery() {
			 
			 //delivery person
				SimpleMailMessage message = new SimpleMailMessage(); 
		      message.setFrom("pizzaforhappiness@gmail.com");
		      message.setTo("pizzaforhappiness@gmail.com"); 
		      message.setSubject("Order Pick-up."); 
		      message.setText("Jack, Please pick-up the order and deliver it to user .");
		      emailSender.send(message);
		      
		}
		 
		 public void sendEmailManagerForAcceptOrder(int orderid) {
			 
			 
				SimpleMailMessage message = new SimpleMailMessage(); 
		      message.setFrom("pizzaforhappiness@gmail.com");
		      message.setTo("sujitshinde2000@gmail.com"); 
		      message.setSubject("You Accepted Order No "+ orderid); 
		      message.setText("You have accepted the Order " + orderid + "\nIf not done by you Contact our Manager/HR Mr.Sujit Shinde at 139");
		      emailSender.send(message);
		      
		}
		 
		 public void sendEmailForOrderDelivered(String email,int orderid) {
				SimpleMailMessage message = new SimpleMailMessage(); 
		      message.setFrom("pizzaforhappiness@gmail.com");
		      message.setTo(email); 
		      message.setSubject("Order No "+ orderid +" Delivered ."); 
		      message.setText("Your order No "+ orderid +" is delivered\nIf not delivered by Delivery Patner  Contact our Manager/HR Mr.Sujit Shinde at 139.\n\n ThankYou for choosing US.\nOrder Again!");
		      emailSender.send(message);
		}
		 
		 public void sendEmailManagerForOrderDelivered(int orderid) {
				SimpleMailMessage message = new SimpleMailMessage(); 
		      message.setFrom("pizzaforhappiness@gmail.com");
		      message.setTo("sujitshinde2000@gmail.com"); 
		      message.setSubject("Order No "+ orderid +" Delivered ."); 
		      message.setText("Delivery Patner Jack has delivered the order no "+ orderid + " If not delivered by jack Contact our Manager/HR Mr.Sujit Shinde at 139");
		      emailSender.send(message);
		}
}