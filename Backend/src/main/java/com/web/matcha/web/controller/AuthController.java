package com.web.matcha.web.controller;

import com.web.matcha.service.AuthService;
import io.javalin.Javalin;

import java.util.Collections;

public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	public void registerRoutes(Javalin app) {
		app.post("/auth/token", ctx -> {
			String email = ctx.formParam("email");
			String password = ctx.formParam("password");

			if (email == null || password == null) {
				ctx.status(400).result("Email and password are required");
				return;
			}

			String token = authService.authenticate(email, password);
			if (token != null) {
				ctx.status(200)
					.contentType("application/json")
					.json(Collections.singletonMap("token", token));
			} else {
				ctx.status(401).result("Invalid email or password");
			}
		});
	}
}
