package com.web.matcha.domain.utils;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtils {

	public static final String hashPassword(final String plainPassword) {
		return BCrypt.hashpw(plainPassword, BCrypt.gensalt(12));  // Use a work factor of 12 (configurable)
	}

	public static boolean checkPassword(final String plainPassword, final String hashedPassword) {
		return BCrypt.checkpw(plainPassword, hashedPassword);
	}
}