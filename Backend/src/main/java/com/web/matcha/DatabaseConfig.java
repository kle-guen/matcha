package com.web.matcha;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import javax.sql.DataSource;

public class DatabaseConfig {

	private static HikariDataSource dataSource;

	static {
		HikariConfig config = new HikariConfig();
		config.setJdbcUrl("jdbc:postgresql://localhost:5432/matcha");
		config.setDriverClassName("org.postgresql.Driver");
		config.setUsername("matcha");
		config.setPassword("matcha");
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