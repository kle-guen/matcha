package com.web.matcha.web.controller;

import com.web.matcha.domain.model.User;
import com.web.matcha.service.UserService;
import io.javalin.Javalin;
import io.javalin.http.Context;

public class UserController {

	private final UserService userService;

	public UserController(final UserService userService) {
		this.userService = userService;
	}

	public void registerRoutes(final Javalin app) {
		app.get("/users", this::getAllUsers);
		app.get("/users/{id}", this::getUserById);
		app.post("/users", this::createUser);
	}

	private void getAllUsers(final Context ctx) {
		ctx.json(userService.getAllUsers());
	}

	private void getUserById(final Context ctx) {
		int id = Integer.parseInt(ctx.pathParam("id"));
		User user = userService.getUserById(id);
		if (user != null) {
			ctx.json(user);
		} else {
			ctx.status(404).result("User not found");
		}
	}

	private void createUser(final Context ctx) {
		User user = ctx.bodyAsClass(User.class);
		userService.addUser(user);
		ctx.status(201).json(user);
	}
}
