package com.web.matcha.web.controller;

import com.web.matcha.domain.model.UserModel;
import com.web.matcha.service.InterestsService;
import com.web.matcha.service.UserService;
import com.web.matcha.web.dto.UserDto;
import io.javalin.Javalin;
import io.javalin.http.Context;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class InterestsController extends  AbstractController {

	private final InterestsService interestsService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/interests", this::getInterests);
	}

	private void getInterests(final Context ctx) {
		ctx.status(200).json(interestsService.getInterests());
	}

}
