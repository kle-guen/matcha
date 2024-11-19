package com.web.matcha.service;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.User;

import java.util.ArrayList;
import java.util.List;


public class UserService {

	final private UserDAO userDAO;

	public UserService(final UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	public List<User> getAllUsers() {
		return userDAO.getAllUsers();
	}

	public User getUserById(Long id) {
		return userDAO.getUserById(id);
	}

	public void addUser(User user) {
		userDAO.insertUser(user);
	}
}