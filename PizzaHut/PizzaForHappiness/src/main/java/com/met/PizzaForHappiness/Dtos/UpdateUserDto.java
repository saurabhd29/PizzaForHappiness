package com.met.PizzaForHappiness.Dtos;

public class UpdateUserDto {
	
	
	private int userId;
	private String firstName;
	private String lastName;
	private String email;
	private String mobileNo;
	private String address;
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
	public UpdateUserDto() {
	}
	
	
	public UpdateUserDto(int userId, String firstName, String lastName, String email, String mobileNo, String address) {
		super();
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.mobileNo = mobileNo;
		this.address = address;
	}
	@Override
	public String toString() {
		return "UpdateUserDto [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", mobileNo=" + mobileNo + ", address=" + address + "]";
	}
	
	
	
	
	
	
	
	

}
