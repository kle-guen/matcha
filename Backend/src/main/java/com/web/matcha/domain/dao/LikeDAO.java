package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.BlockModel;
import com.web.matcha.domain.model.LikeModel;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LikeDAO {

	public List<LikeModel> getLikesByUserId(final Long id) {
		final String sql = "SELECT * FROM likes where liker_id = ? or liked_id = ?";
		final List<LikeModel> blocks = new ArrayList<>();

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setLong(1, id);
			stmt.setLong(2, id);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				blocks.add(new LikeModel(
						rs.getInt("liker_id"),
						rs.getInt("liked_id"),
						rs.getTimestamp("created_at")
				));
			}

		} catch (SQLException e) {
			e.printStackTrace(); // Gère les erreurs ici ou utilise un logger
		}
		return blocks;
	}

}
