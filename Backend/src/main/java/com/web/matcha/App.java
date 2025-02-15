package com.web.matcha;

import com.web.matcha.config.Env;
import com.web.matcha.config.RoutesConfig;
import com.web.matcha.config.AuthMiddleware;
import io.github.cdimascio.dotenv.Dotenv;
import io.javalin.Javalin;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.util.Objects;

public final class App {

	public static void main(final String[] args) {
		System.setProperty("org.slf4j.simpleLogger.logFile", "System.out");
		Dotenv.configure().directory("usr/src/app");
		final int port = Integer.parseInt(Objects.requireNonNull(Env.getDotenv().get("API_PORT")));
		final Javalin app = Javalin.create(config -> config.showJavalinBanner = false).start("0.0.0.0", port);
		app.before(ctx -> {
			String path = ctx.path();
			String method = String.valueOf(ctx.method());
			if (path.equals("/auth/token") || ((path.equals("/users")) && method.equals("POST")) || path.equals("/verify-email") || path.contains("/forgot-password")) {
				return;
			}
			new AuthMiddleware().handle(ctx);
		});
		RoutesConfig.configure(app);
	}
}