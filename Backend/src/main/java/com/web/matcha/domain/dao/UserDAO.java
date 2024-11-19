package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

	public List<User> getAllUsers() {
		List<User> users = new ArrayList<>();
		String sql = "SELECT id, username, email FROM users";

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql);
		     ResultSet rs = stmt.executeQuery()) {

			while (rs.next()) {
				users.add(new User(
						rs.getInt("id"),
						rs.getString("name"),
						rs.getString("email")
				));
			}

		} catch (SQLException e) {
			e.printStackTrace(); // Gère les erreurs ici ou utilise un logger
		}

		return users;
	}

	public User getUserById(Long id) {
		String sql = "SELECT * FROM users where id = ?";

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setLong(1, id);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return new User(
						rs.getInt("id"),
						rs.getString("username"),
						rs.getString("email")
				);
			}

		} catch (SQLException e) {
			e.printStackTrace(); // Gère les erreurs ici ou utilise un logger
		}
		return null;
	}

	public void insertUser(User user) {
		String sql = "INSERT INTO users (username, email) VALUES (?, ?)";

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, user.getName());
			stmt.setString(2, user.getEmail());
			stmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
