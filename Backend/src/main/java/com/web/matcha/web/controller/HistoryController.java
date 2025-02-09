package com.web.matcha.web.controller;

import com.web.matcha.service.HistoryService;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class HistoryController extends AbstractController {

	private final HistoryService historyService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/history", this::getHistory);
	}

	private void getHistory(final Context ctx) {
		ctx.status(HttpStatus.ACCEPTED).json(historyService.getHistory());
	}
}
