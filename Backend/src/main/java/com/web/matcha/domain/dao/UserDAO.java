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

	public Optional<UserModel> getUserById(final int id) {
		final String sql = "SELECT * FROM users where id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			final ResultSet rs = stmt.executeQuery();
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
			log.error("Error while getting user by id", e);
		}
		return Optional.empty();
	}

	public Optional<UserModel> getUserByEmail(final String email) {
		String sql = "SELECT * FROM users WHERE email = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, email);
			final ResultSet rs = stmt.executeQuery();
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
		final String sql = "INSERT INTO users (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, userModel.getUsername());
			stmt.setString(2, userModel.getEmail());
			stmt.setString(3, userModel.getPassword());
			stmt.setString(4, userModel.getFirstName());
			stmt.setString(5, userModel.getLastName());
			stmt.executeUpdate();

			try (final ResultSet generatedKeys = stmt.getGeneratedKeys()) {
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

	public void verifyUserEmail(int userId) {
		final String sql = "UPDATE users SET is_verified = true WHERE id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, userId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while verifying user email", e);
		}
	}
}
