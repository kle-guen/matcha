package com.web.matcha.service;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.domain.utils.JwtUtils;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.UnauthorizedResponse;
import org.mindrot.jbcrypt.BCrypt;

public class AuthService {

	private final UserDAO userDAO;

	public AuthService(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	public String authenticate(String email, String password) {
		final UserModel user = userDAO.getUserByEmail(email, password)
				.orElseThrow(() -> new NotFoundResponse("Unknown email."));

		if (!BCrypt.checkpw(password, user.getPassword())) {
			throw new UnauthorizedResponse("Invalid password");
		}
		if (!user.getVerified()) {
			throw new UnauthorizedResponse("Email not verified");
		}

		final int userId = user.getId();
		return JwtUtils.generateToken(userId);
	}
}
