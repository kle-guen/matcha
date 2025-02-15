package com.web.matcha.web.controller;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.enums.EmailTokenTypeEnum;
import com.web.matcha.service.EmailService;
import com.web.matcha.service.UserService;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ResetPasswordController extends AbstractController {

	private final EmailService emailService;

	private final UserService userService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.post("/forgot-password/request", this::forgotPassword);
		app.post("/forgot-password/reset", this::resetPassword);
	}

	/**
	 * Reset password
	 *
	 * @param ctx
	 */
	private void forgotPassword(final Context ctx) {
		final String email = ctx.formParam("email");
		emailService.sendEmail(email, EmailTokenTypeEnum.RESET_PASSWORD);
	}

	/**
	 * Reset password
	 *
	 * @param ctx
	 */
	private void resetPassword(final Context ctx) {
		final String token = ctx.queryParam("token");
		final String password = ctx.formParam("password");
		if (password == null|| password.length() < 8) {
			ctx.status(HttpStatus.BAD_REQUEST).result("Password must be at least 8 characters long");
			return;
		}
		final int userId = emailService.getUserIdByToken(token);
		emailService.deleteToken(token);
		userService.resetPassword(userId, password);
	}
}
