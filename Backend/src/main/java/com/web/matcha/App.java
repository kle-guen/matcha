package com.web.matcha;

import com.web.matcha.config.Env;
import com.web.matcha.config.RoutesConfig;
import io.javalin.Javalin;

import java.util.Objects;

public final class App {

	public static void main(final String[] args) {
		System.setProperty("org.slf4j.simpleLogger.logFile", "System.out");
		final int port = Integer.parseInt(Objects.requireNonNull(Env.getDotenv().get("API_PORT")));
		final Javalin app = Javalin.create(config -> config.showJavalinBanner = false).start(port);

		RoutesConfig.configure(app);
	}
}