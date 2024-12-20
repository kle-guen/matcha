package com.web.matcha.web.controller;

import com.web.matcha.service.AuthService;
import com.web.matcha.web.dto.UserDto;
import io.javalin.Javalin;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import lombok.RequiredArgsConstructor;

import java.util.Collections;

@RequiredArgsConstructor
public class AuthController extends AbstractController {

	private final AuthService authService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.post("/auth/token", this::getTokens);
	}

	private void getTokens(final Context ctx) {
		final UserDto userDto = ctx.bodyAsClass(UserDto.class);
		final String email = userDto.getEmail();
		final String password = userDto.getPassword();
		if (email == null || password == null) {
			throw new BadRequestResponse("Invalid email or password");
		}

		final String token = authService.authenticate(email, password);
		ctx.status(HttpStatus.ACCEPTED)
				.contentType("application/json")
				.json(Collections.singletonMap("token", token));
	}
}
