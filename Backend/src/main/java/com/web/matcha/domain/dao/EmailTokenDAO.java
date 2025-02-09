package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.EmailTokenModel;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Slf4j
public class EmailTokenDAO {
	public Optional<EmailTokenModel> insertEmailToken(final EmailTokenModel emailToken) {
		final String sql = "INSERT INTO email_verification_tokens (user_id, token) VALUES (?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {

			stmt.setLong(1, emailToken.getUserId());
			stmt.setString(2, emailToken.getToken());
			stmt.executeUpdate();

			try (final ResultSet generatedKeys = stmt.getGeneratedKeys()) {
				if (generatedKeys.next()) {
					emailToken.setUserId(generatedKeys.getInt(1));
				}
			}

		} catch (SQLException e) {
			log.error("Error while inserting mail token", e);
			return Optional.empty();
		}

		return Optional.of(emailToken);
	}

	public Optional<Integer> getUserIdByToken(final String token) {
		final String sql = "SELECT * FROM email_verification_tokens WHERE token = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, token);
			final ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return Optional.of(
					rs.getInt("user_id")
				);
			}

		} catch (SQLException e) {
			log.error("Error while getting user id by token", e);
		}
		return Optional.empty();
	}

	public void deleteToken(final String token) {
		final String sql = "DELETE FROM email_verification_tokens WHERE token = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, token);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while deleting token", e);
		}
	}
}
