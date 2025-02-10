package com.web.matcha;

import com.web.matcha.config.Env;
import com.web.matcha.config.RoutesConfig;
import com.web.matcha.config.AuthMiddleware;
import io.javalin.Javalin;

import java.util.Objects;

public final class App {

	public static void main(final String[] args) {
		System.setProperty("org.slf4j.simpleLogger.logFile", "System.out");
		final int port = Integer.parseInt(Objects.requireNonNull(Env.getDotenv().get("API_PORT")));
		final Javalin app = Javalin.create(config -> config.showJavalinBanner = false).start(port);
		app.before(ctx -> {
			String path = ctx.path();
			String method = String.valueOf(ctx.method());
			if (path.equals("/auth/token") || (path.equals("/users")) && method.equals("POST") || path.equals("/verify-email")) {
				return;
			}
			new AuthMiddleware().handle(ctx);
		});
		RoutesConfig.configure(app);
	}
}