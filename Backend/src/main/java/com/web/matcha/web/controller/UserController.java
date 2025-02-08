package com.web.matcha.web.controller;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.service.EmailService;
import com.web.matcha.service.UserService;
import com.web.matcha.web.dto.UserDto;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserController extends AbstractController {

	private final UserService userService;
	private final EmailService emailService;

	@Override
	public void registerRoutes(final Javalin app) {
		//GET
		app.get("/users/me", this::getMyUser);
		app.get("/users/{id}", this::getUserById);

		//POST
		app.post("/users", this::createUser);
	}

	private void getMyUser(final Context ctx) {
		final int id = UserHolder.getUserId();

		final UserModel userModel = userService.getUserById(id);
		ctx.status(HttpStatus.ACCEPTED.getCode()).json(userModel);
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
		ctx.status(HttpStatus.ACCEPTED.getCode()).json(userModel);
	}

	private void createUser(final Context ctx) {
		UserDto userDto = ctx.bodyAsClass(UserDto.class);
		userService.addUser(userDto);
		//emailService.sendVerificationEmail(userDto.getEmail());
		ctx.status(HttpStatus.CREATED.getCode()).json(userDto);
	}
}
