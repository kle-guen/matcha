package com.web.matcha;

import com.web.matcha.config.Env;
import com.web.matcha.config.RoutesConfig;
import com.web.matcha.config.AuthMiddleware;
import io.github.cdimascio.dotenv.Dotenv;
import spark.Spark;

import static spark.Spark.*;

import java.util.Objects;

public final class App {

    public static void main(final String[] args) {
        System.setProperty("org.slf4j.simpleLogger.logFile", "System.out");
        //Dotenv.configure().directory("usr/src/app");
        final int port = Integer.parseInt(Objects.requireNonNull(Env.getDotenv().get("API_PORT")));
        port(port);

        // Middleware for authentication
        before((request, response) -> {
            String path = request.pathInfo();
            String method = request.requestMethod();
            if (path.equals("/auth/token") || (path.equals("/users") && method.equals("POST")) || path.equals("/verify-email") || path.contains("/forgot-password")) {
                return;
            }
            AuthMiddleware.handle();
        });

        // Configure routes
        RoutesConfig.configure();

        Spark.init();
    }
}