package com.web.matcha.web.controller;

import com.web.matcha.service.AuthService;
import io.javalin.Javalin;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;

import java.util.Collections;

public class AuthController extends AbstractController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@Override
	public void registerRoutes(final Javalin app) {
		app.post("/auth/token", this::getTokens);
	}

	public void getTokens(final Context ctx) {
		final String email = ctx.formParam("email");
		final String password = ctx.formParam("password");

		if (email == null || password == null) {
			throw new BadRequestResponse("Email and password are required");
		}

		final String token = authService.authenticate(email, password);
		ctx.status(200)
				.contentType("application/json")
				.json(Collections.singletonMap("token", token));
	}
}
