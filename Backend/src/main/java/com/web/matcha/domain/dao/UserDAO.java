package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.UserModel;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Slf4j
public class UserDAO {

	public Optional<UserModel> getUserById(Long id) {
		String sql = "SELECT * FROM users where id = ?";

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setLong(1, id);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return Optional.of(new UserModel(
						rs.getInt("id"),
						rs.getString("username"),
						rs.getString("email"),
						rs.getString("password_hash"),
						rs.getString("first_name"),
						rs.getString("last_name"),
						rs.getBoolean("is_verified"),
						rs.getTimestamp("last_login_at")
				));
			}

		} catch (SQLException e) {
			log.error("Error while getting user by id", e);
		}
		return Optional.empty();
	}

	public Optional<UserModel> getUserByEmail(String email) {
		String sql = "SELECT * FROM users WHERE email = ?";

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, email);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return Optional.of(new UserModel(
						rs.getInt("id"),
						rs.getString("username"),
						rs.getString("email"),
						rs.getString("password"),
						rs.getString("first_name"),
						rs.getString("last_name"),
						rs.getBoolean("is_verified"),
						rs.getTimestamp("last_login_at")
				));
			}

		} catch (SQLException e) {
			log.error("Error while getting user by email", e);
		}
		return Optional.empty();
	}


	public Optional<UserModel> insertUser(UserModel userModel) {
		String sql = "INSERT INTO users (username, email, password, first_name, last_name, last_login_at) VALUES (?, ?, ?, ?, ?, ?)";

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, userModel.getUsername());
			stmt.setString(2, userModel.getEmail());
			stmt.setString(3, userModel.getPassword());
			stmt.setString(4, userModel.getFirstName());
			stmt.setString(5, userModel.getLastName());
			stmt.setTimestamp(6, userModel.getLastLoginAt());
			stmt.executeUpdate();

			try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
				if (generatedKeys.next()) {
					userModel.setId(generatedKeys.getInt(1));
				}
			}

		} catch (SQLException e) {
			log.error("Error while inserting user", e);
			return Optional.empty();
		}

		return Optional.of(userModel);
	}
}
