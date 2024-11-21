package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.BlockModel;
import com.web.matcha.domain.model.UserModel;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
public class BlockDAO {

	public List<BlockModel> getBlockedByUserId(final Long id) {
		final String sql = "SELECT * FROM blocks where blocker_id = ? or blocked_id = ?";
		final List<BlockModel> blocks = new ArrayList<>();

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setLong(1, id);
			stmt.setLong(2, id);
			final ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				blocks.add(new BlockModel(
						rs.getInt("blocker_id"),
						rs.getInt("blocked_id")
				));
			}

		} catch (SQLException e) {
			log.error("Error while getting blocks by user id", e);
			return List.of();
		}
		return blocks;
	}

}
