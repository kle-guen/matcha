package com.web.matcha.config;

public abstract class UserHolder {
	private static final ThreadLocal<Integer> userId = new ThreadLocal<>();

	public static void setUserId(Integer userId) {
		UserHolder.userId.set(userId);
	}

	public static Integer getUserId() {
		return userId.get();
	}

	public static void clear() {
		userId.remove();
	}
}
