package com.web.matcha.service;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.UserModel;

import java.util.List;


public class UserService {

	final private UserDAO userDAO;

	public UserService(final UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	public UserModel getUserById(Long id) {
		return userDAO.getUserById(id);
	}

	public void addUser(UserModel userModel) {
		userDAO.insertUser(userModel);
	}
}