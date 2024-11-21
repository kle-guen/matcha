package com.web.matcha;

import com.web.matcha.config.Env;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import io.github.cdimascio.dotenv.Dotenv;

import javax.sql.DataSource;

public class DatabaseConfig {

	private static final HikariDataSource dataSource;

	static {
		Dotenv env = Env.getDotenv();
		HikariConfig config = new HikariConfig();
		config.setJdbcUrl(env.get("DB_URL"));
		config.setDriverClassName(env.get("DB_DRIVER"));
		config.setUsername(env.get("DB_USERNAME"));
		config.setPassword(env.get("DB_PASSWORD"));
		config.setMaximumPoolSize(10);
		config.setMinimumIdle(2);
		config.setIdleTimeout(60000);
		config.setConnectionTimeout(30000);
		config.setMaxLifetime(1800000);

		dataSource = new HikariDataSource(config);
	}

	public static DataSource getDataSource() {
		return dataSource;
	}

	public static void closeDataSource() {
		if (dataSource != null && !dataSource.isClosed()) {
			dataSource.close();
		}
	}
}