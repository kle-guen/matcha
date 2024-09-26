package com.web.matcha;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * DatabaseManager class
 */
public class DatabaseManager {

	/**
	 * Instance of DatabaseManager
	 */
	private static DatabaseManager instance;

	/**
	 * Connection
	 */
	private Connection connection;

	/**
	 * URL
	 */
	private static final String URL = "jdbc:postgresql://localhost:5432/matcha";

	/**
	 * User
	 */
	private static final String USER = "matcha";

	/**
	 * Password
	 */
	private static final String PASSWORD = "matcha";

	/**
	 * Constructor
	 */
	private DatabaseManager() {
		try {
			this.connection = DriverManager.getConnection(URL, USER, PASSWORD);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Get instance of DatabaseManager
	 *
	 * @return instance
	 */
	public static synchronized DatabaseManager getInstance() {
		if (instance == null) {
			instance = new DatabaseManager();
		}
		return instance;
	}

	/**
	 * Get connection
	 *
	 * @return connection
	 */
	public Connection getConnection() {
		return connection;
	}
}