package com.met.PizzaForHappiness.Dtos;

public class UpdateRoleDto {

	private int userId;
	private String role;
	
	
	public UpdateRoleDto() {

	}
	
	
	public UpdateRoleDto(int userId, String role) {
		super();
		this.userId = userId;
		this.role = role;
	}


	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	@Override
	public String toString() {
		return "UpdateRoleDto [userId=" + userId + ", role=" + role + "]";
	}
	
	
	
	
	
	
	
}
