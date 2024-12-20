package com.web.matcha.domain.utils;

import com.web.matcha.config.Env;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.javalin.http.Context;
import java.lang.Class;

import java.util.Date;

public class JwtUtils {

	private static final String secretKey;

	static {
		secretKey = Env.getDotenv().get("API_TOKEN_SECRET_KEY");
	}

	public static String generateToken(final int userId) {
		final long expirationTime = 1000 * 60 * 60; // Token valid for 1 hour

		return Jwts.builder()
			.setSubject(String.valueOf(userId))
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + expirationTime))
			.signWith(SignatureAlgorithm.HS512, secretKey)
			.compact();
	}

	public static String extractToken(Context ctx) {
		String header = ctx.header("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			return header.substring(7);  // Extract the token part
		}
		return null;
	}

	public static int validateTokenAndGetUserId(final String token) throws Exception {
		Claims claims = Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(token)
			.getBody();

		if (claims.getExpiration().before(new Date())) {
			throw new Exception("Token expired");
		}
		return claims.get("userId", Integer.class);
	}
}