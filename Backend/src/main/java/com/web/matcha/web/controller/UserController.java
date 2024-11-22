package com.web.matcha.web.controller;

import com.web.matcha.domain.model.UserModel;
import com.web.matcha.service.UserService;
import com.web.matcha.web.dto.UserDto;
import io.javalin.Javalin;
import io.javalin.http.Context;

public class UserController extends AbstractController {

	private final UserService userService;

	public UserController(final UserService userService) {
		this.userService = userService;
	}

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/users/{id}", this::getUserById);
		app.post("/users", this::createUser);
	}

	private void getUserById(final Context ctx) {
		final Long id = Long.parseLong(ctx.pathParam("id"));
		final UserModel userModel = userService.getUserById(id);
		ctx.status(200).json(userModel);
	}

	private void createUser(final Context ctx) {
		UserDto userDto = ctx.bodyAsClass(UserDto.class);
		userService.addUser(userDto);
		ctx.status(201).json(userDto);
	}
}
