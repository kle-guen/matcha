package com.web.matcha;

import com.web.matcha.config.Env;
import com.web.matcha.config.RoutesConfig;
import com.web.matcha.config.AuthMiddleware;
import io.javalin.Javalin;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.util.Objects;

public final class App {

	public static void main(final String[] args) {
		System.setProperty("org.slf4j.simpleLogger.logFile", "System.out");
		final int port = Integer.parseInt(Objects.requireNonNull(Env.getDotenv().get("API_PORT")));
		final Javalin app = Javalin.create(config -> config.showJavalinBanner = false).start(port);
		app.before(ctx -> {
			String path = ctx.path();
			String method = String.valueOf(ctx.method());
			if (path.equals("/auth/token") || ((path.equals("/users")) && method.equals("POST")) || path.equals("/verify-email")) {
				return;
			}
			new AuthMiddleware().handle(ctx);
		});
		RoutesConfig.configure(app);
		app.get("/images/{fileName}", ctx -> {
			String fileName = ctx.pathParam("fileName");
			File file = new File("uploads/" + fileName);

			// 🔐 Vérifier si le fichier existe
			if (!file.exists()) {
				ctx.status(404).result("Image not found");
				return;
			}

			// 📤 Envoyer l'image avec le bon type MIME
			String mimeType = Files.probeContentType(file.toPath());
			ctx.contentType(mimeType != null ? mimeType : "application/octet-stream");
			ctx.result(new FileInputStream(file));
		});
	}
}