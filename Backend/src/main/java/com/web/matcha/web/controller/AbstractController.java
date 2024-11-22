package com.web.matcha.web.controller;

import io.javalin.Javalin;

/**
 * Abstract controller class that all controllers should extend.
 */
public abstract class AbstractController {

	/**
	 * Register the routes for the controller.
	 *
	 * @param app The Javalin app to register the routes to.
	 */
	public abstract void registerRoutes(final Javalin app);
}
