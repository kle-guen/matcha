package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.BlockModel;
import com.web.matcha.domain.model.UserModel;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BlockDAO {

	public List<BlockModel> getBlockedByUserId(final Long id) {
		final String sql = "SELECT * FROM blocks where blocker_id = ? or blocked_id = ?";
		final List<BlockModel> blocks = new ArrayList<>();

		try (Connection conn = DatabaseConfig.getDataSource().getConnection();
		     PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setLong(1, id);
			stmt.setLong(2, id);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				blocks.add(new BlockModel(
						rs.getInt("blocker_id"),
						rs.getInt("blocked_id")
				));
			}

		} catch (SQLException e) {
			e.printStackTrace(); // Gère les erreurs ici ou utilise un logger
		}
		return blocks;
	}

}
