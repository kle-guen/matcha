package com.web.matcha.config;

import com.web.matcha.domain.utils.JwtUtils;
import spark.Request;
import spark.Response;
import static spark.Spark.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuthMiddleware {

    public static void handle() {
        before((req, res) -> {
            String token = JwtUtils.extractToken(req);
            log.info("Request: {}", req);
            if (token == null) {
                halt(401, "Authorization token is missing");
            }

            try {
                final Integer userId = JwtUtils.validateTokenAndGetUserId(token);
                UserHolder.setUserId(userId);
                log.info("User ID: {}", userId);
            } catch (Exception e) {
                halt(401, "Token validation failed: " + e.getMessage());
            }
        });
    }
}