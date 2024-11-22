package com.web.matcha.web.controller;

import com.web.matcha.service.EmailService;
import com.web.matcha.service.UserService;
import io.javalin.Javalin;
import lombok.RequiredArgsConstructor;
import io.javalin.http.Context;

@RequiredArgsConstructor
public class EmailTokenController extends AbstractController {

	private final EmailService emailService;
	private final UserService userService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.post("/verify-email", this::verifyEmail);
	}

	public void verifyEmail(final Context ctx) {
		final String token = ctx.queryParam("token");
		final int userId = emailService.getUserIdByToken(token);
		userService.verifyUserEmail(userId);
		emailService.deleteToken(token);
	}
}
