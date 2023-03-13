package com.met.PizzaForHappiness.Services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.met.PizzaForHappiness.Daos.UserDao;
import com.met.PizzaForHappiness.Dtos.Credentials;
import com.met.PizzaForHappiness.Dtos.DtoEntityConverter;
import com.met.PizzaForHappiness.Dtos.UpdateRoleDto;
import com.met.PizzaForHappiness.Dtos.UpdateUserDto;
import com.met.PizzaForHappiness.Dtos.UserDTO;
import com.met.PizzaForHappiness.Entities.User;

@Transactional
@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	@Autowired
	private PasswordEncoder passwordencoder;
	@Autowired
	private DtoEntityConverter converter;

	public User findUserById(int userId) {
		User user = userDao.findByUserId(userId);
		return user;
	}

	public UserDTO save(User user) {
		System.out.println("inside encryp save");
		User user1 = userDao.findByEmail(user.getEmail());
		if (user1 != null) {
			return null;
		} else {
			String rawPassword = user.getPassword(); //Qwerty@123
			String encPassword = passwordencoder.encode(rawPassword);
			user.setPassword(encPassword);
			User user2 = userDao.save(user);
			
			UserDTO result = converter.toUserDto(user2);
			result.setPassword("*********");
			return result;
		}
	}

	public UserDTO findUserByEmailAndPassword(Credentials cred) {
		User user = userDao.findByEmail(cred.getEmail());
		//User user = userDao.findByLastName(cred.getEmail());
		String password = cred.getPassword();
		System.out.println("inside findUserByEmailAndPassword");
		if (user != null && passwordencoder.matches(password, user.getPassword())) {
			
			UserDTO result = converter.toUserDto(user);
			result.setPassword("*********");
			return result;
		}
		return null;
	}
	
	public User ChangeRole(UpdateRoleDto role)
	{
		
		User user=findUserById(role.getUserId());
		
		System.out.println(user);
		user.setRole(role.getRole());
//		user= userDao.save(user);
		System.out.println(user);
		return user;
	}

	public User updateProfile(UpdateUserDto user) {

		User user1 = findUserById(user.getUserId());

		System.out.println(user1);
		user1.setFirstName(user.getFirstName());
		user1.setLastName(user.getLastName());
		user1.setEmail(user.getEmail());
		user1.setMobileNo(user.getMobileNo());
		user1.setAddress(user.getAddress());

		user1 = userDao.save(user1);
		
		return user1;
	}
	
	

	// Get All the Users
	public List<UserDTO> getAll() {

		List<User> users = userDao.findAll();
		List<UserDTO> usersResult = new ArrayList<>();

		Iterator<User> itr = users.iterator();

		while (itr.hasNext()) {
			UserDTO result = converter.toUserDto(itr.next());
			result.setPassword("*********");
			usersResult.add(result);
		}

		return usersResult;
	}

}
