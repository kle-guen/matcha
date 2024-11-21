package com.web.matcha.domain.utils;

import com.web.matcha.config.Env;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtils {

	private static final String secretKey;

	static {
		secretKey = Env.getDotenv().get("API_TOKEN_SECRET_KEY");
	}

	public static String generateToken(final String username) {
		final long expirationTime = 1000 * 60 * 60; // Token valid for 1 hour

		return Jwts.builder()
			.setSubject(username)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + expirationTime))
			.signWith(SignatureAlgorithm.HS512, secretKey)
			.compact();
	}

	public static Claims validateToken(final String token) {
		return Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(token)
			.getBody();
	}

	public static String getUsernameFromToken(final String token) {
		return validateToken(token).getSubject();
	}
}