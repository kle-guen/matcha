package com.web.matcha.service;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.domain.utils.JwtUtils;

public class AuthService {

	private final UserDAO userDAO;

	public AuthService(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	public String authenticate(String email, String password) {
		UserModel user = userDAO.getUserByEmail(email);
		// todo check if password is correct
		if (user != null) {
			return JwtUtils.generateToken(user.getEmail());
		}
		return null;
	}

	public String validateToken(String token) {
		try {
			return JwtUtils.getUsernameFromToken(token);
		} catch (Exception e) {
			return null; // Invalid token
		}
	}
}
