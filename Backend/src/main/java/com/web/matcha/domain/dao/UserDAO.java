package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.UserModel;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

	public UserModel getUserById(Long id) {
		String sql = "SELECT * FROM users where id = ?";

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setLong(1, id);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return new UserModel(
						rs.getInt("id"),
						rs.getString("username"),
						rs.getString("email"),
						rs.getString("password_hash"),
						rs.getString("first_name"),
						rs.getString("last_name"),
						rs.getBoolean("is_verified"),
						rs.getTimestamp("last_login_at")
				);
			}

		} catch (SQLException e) {
			e.printStackTrace(); // Gère les erreurs ici ou utilise un logger
		}
		return null;
	}

	// Retrieves a user by their email
	public UserModel getUserByEmail(String email) {
		String sql = "SELECT * FROM users WHERE email = ?";

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, email);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return new UserModel(
						rs.getInt("id"),
						rs.getString("username"),
						rs.getString("email"),
						rs.getString("password"),
						rs.getString("first_name"),
						rs.getString("last_name"),
						rs.getBoolean("is_verified"),
						rs.getTimestamp("last_login_at")
				);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}


	public void insertUser(UserModel userModel) {
		String sql = "INSERT INTO users (username, email) VALUES (?, ?, ?, ?, ?, ?)";

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, userModel.getUsername());
			stmt.setString(2, userModel.getEmail());
			stmt.setString(3, userModel.getPassword_hash());
			stmt.setString(4, userModel.getFirst_name());
			stmt.setString(5, userModel.getLast_name());
			stmt.setTimestamp(6, userModel.getLast_login_at());
			stmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
