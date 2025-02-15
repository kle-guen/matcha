package com.web.matcha.web.controller;

import com.web.matcha.service.NotificationService;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class NotificationController extends AbstractController {
	private final NotificationService notificationService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/notifications", this::getNotificationsByUserId);
	}

	private void getNotificationsByUserId(final Context ctx) {
		ctx.status(HttpStatus.ACCEPTED).json(notificationService.getNotificationsByUserId());
	}
}
