package com.web.matcha.domain.utils;

import com.web.matcha.config.Env;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import spark.Request;
import spark.Spark;

import java.util.Date;

public class JwtUtils {

    private static final String secretKey;

    static {
        secretKey = Env.getDotenv().get("API_TOKEN_SECRET_KEY");
    }

    public static String generateToken(final int userId) {
        final long expirationTime = 1000 * 60 * 60 * 24; // Token valid for 1 day

        return Jwts.builder()
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public static String extractToken(Request request) {
        String header = request.headers("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);  // Extract the token part
        }
        return null;
    }

    public static int validateTokenAndGetUserId(final String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        if (claims.getExpiration().before(new Date())) {
            Spark.halt(401, "Token expired");
        }
        return claims.get("userId", Integer.class);
    }
}