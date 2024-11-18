package com.web.matcha.config;

import com.web.matcha.service.UserService;
import io.javalin.Javalin;
import com.web.matcha.web.controller.UserController;

public class RoutesConfig {

	public static void configure(Javalin app) {
		UserService userService = new UserService();
		UserController userController = new UserController(userService);

		// Enregistre les routes
		userController.registerRoutes(app);
	}

}
