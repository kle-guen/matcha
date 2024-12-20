package com.web.matcha.web.controller;

import com.web.matcha.service.InterestsService;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class InterestsController extends AbstractController {

	private final InterestsService interestsService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/interests", this::getInterests);
	}

	private void getInterests(final Context ctx) {
		ctx.status(HttpStatus.ACCEPTED).json(interestsService.getInterests());
	}

}
