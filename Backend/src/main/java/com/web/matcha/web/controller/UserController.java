package com.web.matcha.web.controller;

import com.web.matcha.domain.model.UserModel;
import com.web.matcha.service.EmailService;
import com.web.matcha.service.UserService;
import com.web.matcha.web.dto.UserDto;
import io.javalin.Javalin;
import io.javalin.http.Context;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserController extends AbstractController {

	private final UserService userService;
	private final EmailService emailService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/users/{id}", this::getUserById);
		app.post("/users", this::createUser);
	}

	private void getUserById(final Context ctx) {
		final int id;
		try {
			id = Integer.parseInt(ctx.pathParam("id"));
			} catch (NumberFormatException e) {
				ctx.status(400).result("Invalid id");
				return;
		}
		final UserModel userModel = userService.getUserById(id);
		ctx.status(200).json(userModel);
	}

	private void createUser(final Context ctx) {
		UserDto userDto = ctx.bodyAsClass(UserDto.class);
		userService.addUser(userDto);
		//emailService.sendVerificationEmail(userDto.getEmail());
		ctx.status(201).json(userDto);
	}
}
