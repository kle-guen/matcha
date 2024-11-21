package com.web.matcha.config;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.Getter;

public class Env {

	@Getter
	private static final Dotenv dotenv;

	static {
		dotenv = Dotenv.load();
	}
}