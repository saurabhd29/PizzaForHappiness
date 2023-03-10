package com.sunbeam.dtos;

import org.springframework.stereotype.Component;

import com.sunbeam.entities.User;

@Component
public class DtoEntityConverter {
	
	
	
	public UserDTO toUserDto(User user)
	{
	
		UserDTO dto= new UserDTO();
		
		dto.setUserId(user.getUserId());
		dto.setFirstName(user.getFirstName());
		dto.setLastName(user.getLastName());
		dto.setEmail(user.getEmail());
		dto.setPassword(user.getPassword());
		dto.setMobileNo(user.getMobileNo());
		dto.setAddress(user.getAddress());
		dto.setRole(user.getRole());
		return dto;
	}
	
	
	
	

}
