package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.InterestModel;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class InterestDAO {

	public List<InterestModel> getInterests() {
		final String sql = "SELECT * FROM interests";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {
			final List<InterestModel> interests = new ArrayList<>();

			final ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				interests.add(new InterestModel(
						rs.getString("code"),
						rs.getString("label")
				));
			}
			return interests;
		} catch (SQLException e) {
			log.error("Error while getting interests", e);
			return List.of();
		}
	}

}
