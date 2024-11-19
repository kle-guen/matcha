package com.web.matcha.config;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.service.UserService;
import io.javalin.Javalin;
import com.web.matcha.web.controller.UserController;

public class RoutesConfig {

	public static void configure(final Javalin app) {
		final UserDAO userDAO = new UserDAO();
		final UserService userService = new UserService(userDAO);
		final UserController userController = new UserController(userService);

		// Enregistre les routes
		userController.registerRoutes(app);
	}

}
