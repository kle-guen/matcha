package com.web.matcha.config;

import com.web.matcha.service.UserService;
import io.javalin.Javalin;
import com.web.matcha.web.controller.UserController;

public class RoutesConfig {

	public static void configure(final Javalin app) {
		final UserService userService = new UserService();
		final UserController userController = new UserController(userService);

		// Enregistre les routes
		userController.registerRoutes(app);
	}

}
