package com.met.PizzaForHappiness.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.met.PizzaForHappiness.Dtos.Credentials;
import com.met.PizzaForHappiness.Dtos.Response;
import com.met.PizzaForHappiness.Dtos.UpdateRoleDto;
import com.met.PizzaForHappiness.Dtos.UpdateUserDto;
import com.met.PizzaForHappiness.Dtos.UserDTO;
import com.met.PizzaForHappiness.Entities.User;
import com.met.PizzaForHappiness.Services.UserService;


@CrossOrigin(origins = "*")
@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	JavaMailSender sender;
	

	@GetMapping("/users/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") int id)
	{
		System.out.println("inside find by id");
		User user= userService.findUserById(id);
		if(user == null)
			return Response.error("user not found");
		return Response.success(user);
	
	}
	
	@PutMapping("/users/update")
	public ResponseEntity<?> updateUser(@RequestBody UpdateUserDto user)
	{
		
		System.out.println(user);
		User user1 = userService.updateProfile(user);

		if(user1!=null)
		{
		return Response.success(user);
		}
		return Response.error("Something Went Wrong");	
	}
	
	

	@PostMapping("/users/register")
	public ResponseEntity<?> registerUser(@RequestBody User user)
	{
		UserDTO result=userService.save(user);
		if(result!=null)
		{
			SimpleMailMessage mailMsg=new SimpleMailMessage();
		       mailMsg.setFrom("saurabh.cdac79@gmail.com");
		       mailMsg.setTo(user.getEmail());
		       String sub = "Registration Succesful " + user.getFirstName();
		       mailMsg.setSubject(sub);
		       mailMsg.setText("Welcome to our Pizza, this mail sent by Pizza For Happiness on Successful Registration");
		       sender.send(mailMsg);
			return Response.success(result);
		}
		return Response.error("user already exists");	
	}
	
	
	@PostMapping("/users/login")
	public ResponseEntity<?> loginUser(@RequestBody Credentials cred)
	{
		UserDTO result=userService.findUserByEmailAndPassword(cred); 
		if(result != null)
		{
			return Response.success(result);
		}
		else
		{
			return Response.error("invalid email or password");
		}			
	}
	
		// Get All Users
	@GetMapping("/users/getAllUsers")
	public ResponseEntity<?> getAllUsers()
	{
		List<UserDTO>  users = userService.getAll();
		
		if(users!=null)
		{
			return Response.success(users);
		}
		return Response.error("Users Do not Exist");	
	}
	
	@PutMapping("/users/ChangeRole")
	public ResponseEntity<?> ChangeRole(@RequestBody UpdateRoleDto role)
	{
		User user= userService.ChangeRole(role);
		if(user!=null)
		{
		return Response.success(user);
		}
		return Response.error("Something Went Wrong");	
	}
	

}

