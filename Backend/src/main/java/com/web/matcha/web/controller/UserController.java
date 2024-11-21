package com.web.matcha.web.controller;

import com.web.matcha.domain.model.UserModel;
import com.web.matcha.service.UserService;
import com.web.matcha.web.dto.UserDto;
import io.javalin.Javalin;
import io.javalin.http.Context;

public class UserController {

	private final UserService userService;

	public UserController(final UserService userService) {
		this.userService = userService;
	}

	public void registerRoutes(final Javalin app) {
		app.get("/users/{id}", this::getUserById);
		app.post("/users", this::createUser);
	}

	private void getUserById(final Context ctx) {
		Long id = Long.parseLong(ctx.pathParam("id"));
		UserModel userModel = userService.getUserById(id);
		if (userModel != null) {
			ctx.json(userModel);
		} else {
			ctx.status(404).result("User not found");
		}
	}

	private void createUser(final Context ctx) {
		try {
			UserDto userDto = ctx.bodyAsClass(UserDto.class);
			userService.addUser(userDto);
			ctx.status(201).json(userDto);
		} catch (IllegalArgumentException e) {
			ctx.status(400).json("Invalid user data.");
		} catch (Exception e) {
			ctx.status(500).json("Internal server error.");
		}
	}
}
