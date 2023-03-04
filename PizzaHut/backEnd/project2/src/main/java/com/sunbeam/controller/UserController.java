package com.sunbeam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dtos.Credentials;
import com.sunbeam.dtos.Response;
import com.sunbeam.dtos.UpdateRoleDto;
import com.sunbeam.dtos.UpdateUserDto;
import com.sunbeam.dtos.UserDTO;
import com.sunbeam.entities.User;
import com.sunbeam.service.UserService;


@CrossOrigin(origins = "*")
@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	

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
