package com.web.matcha.middleware;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.utils.JwtUtils;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.http.HttpStatus;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuthMiddleware implements Handler {

	@Override
	public void handle(Context ctx) throws Exception {
		String token = JwtUtils.extractToken(ctx);
		log.info("Token: " + token);
		if (token == null) {
			ctx.status(HttpStatus.UNAUTHORIZED).result("Authorization token is missing");
			return;
		}

		try {
			// Validate token and set userId in UserHolder
			Integer userId = JwtUtils.validateTokenAndGetUserId(token);
			UserHolder.setUserId(userId);
			log.info("User ID: " + userId);
		} catch (Exception e) {
			ctx.status(HttpStatus.UNAUTHORIZED).result("Token validation failed: " + e.getMessage());
		}
	}
}
