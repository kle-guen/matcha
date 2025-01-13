package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.domain.utils.JwtUtils;
import io.javalin.http.UnauthorizedResponse;

public class AuthService {

	private final UserDAO userDAO;

	public AuthService(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	public String authenticate(String email, String password) {
		final UserModel user = userDAO.getUserByEmail(email)
				.orElseThrow(() -> new UnauthorizedResponse("Invalid email or password"));

		final int userId = user.getId();
		return JwtUtils.generateToken(userId);
	}
}
