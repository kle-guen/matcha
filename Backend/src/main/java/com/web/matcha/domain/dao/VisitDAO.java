package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.VisitModel;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class VisitDAO {

	public void addVisit(final int visitorId, final int visitedId) {
		final String sql = "INSERT INTO visits (visitor_id, visited_id) VALUES (?, ?) ON CONFLICT (visitor_id, visited_id) DO UPDATE SET visited_at = NOW();";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, visitorId);
			stmt.setInt(2, visitedId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while add visit", e);
		}
	}

	public List<VisitModel> getVisitsByVisitedId(final int userId) {
		final String sql = "SELECT * FROM visits WHERE visited_id = ?";
			final List<VisitModel> visitModels = new ArrayList<>();

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, userId);
			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				visitModels.add(VisitModel.builder()
						.visitorId(rs.getInt("visitor_id"))
						.visitedId(rs.getInt("visited_id"))
						.visitedAt(rs.getTimestamp("visited_at"))
						.build());
			}
		} catch (SQLException e) {
			log.error("Error while get visits", e);
		}
		return visitModels;
	}

}
