package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.model.InterestModel;
import lombok.extern.slf4j.Slf4j;

import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
public class InterestDAO {

	public List<InterestModel> getInterests() {
		final String sql = "SELECT * FROM interests";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			return extractInterests(stmt.executeQuery());
		} catch (SQLException e) {
			log.error("Error while getting interests", e);
			return List.of();
		}
	}

	public void setInterestsForUsers(List<String> interests) {
		final Integer userId = UserHolder.getUserId();
		final String sql = "INSERT INTO user_interests (user_id, interest_code) VALUES (?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			for (String interest : interests) {
				stmt.setInt(1, userId);
				stmt.setString(2, interest);
				stmt.addBatch();
			}

			stmt.executeBatch();
		} catch (SQLException e) {
			log.error("Error while setting interests for user", e);
		}
	}

	public static List<InterestModel> extractInterests(final ResultSet rs) throws SQLException {
		if (rs == null) {
			return List.of();
		}
		List<InterestModel> interests = new ArrayList<>();

		while (rs.next()) {
			Optional.of(InterestModel.builder()
							.code(rs.getString("code"))
							.label(rs.getString("label"))
							.build())
					.ifPresent(interests::add);
		}

		return interests;
	}

	public static List<InterestModel> extractInterests2(final Array interestsArray) {
		if (interestsArray == null) {
			return List.of();
		}

		List<InterestModel> interests = new ArrayList<>();

		try {
			Object[] rows = (Object[]) interestsArray.getArray(); // Convertit en tableau exploitable

			for (Object row : rows) {
				if (row != null) {
					String[] fields = row.toString().replace("(", "").replace(")", "").split(",");
					if (fields.length >= 2) {
						interests.add(InterestModel.builder()
								.code(fields[0].trim())  // Supprime les espaces inutiles
								.label(fields[1].trim())
								.build());
					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace(); // Gérer l'exception correctement dans un vrai projet
		}

		return interests;
	}

}
