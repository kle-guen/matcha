package com.web.matcha.domain.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtils {
	// todo Secret key to sign JWT tokens, keep this private and secure in production
	private static final String SECRET_KEY = "0K6HD1csfgep+OHLuMJHz84gw1oPbZ0lE3bTdQG1RwXqYEbdQFFwcZElGt91r37pXQsxrXzot+Cod9qoeLOgUg==";

	public static String generateToken(String username) {
		long expirationTime = 1000 * 60 * 60; // Token valid for 1 hour

		return Jwts.builder()
			.setSubject(username)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + expirationTime))
			.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
			.compact();
	}

	public static Claims validateToken(String token) {
		return Jwts.parser()
			.setSigningKey(SECRET_KEY)
			.parseClaimsJws(token)
			.getBody();
	}

	public static String getUsernameFromToken(String token) {
		return validateToken(token).getSubject();
	}
}