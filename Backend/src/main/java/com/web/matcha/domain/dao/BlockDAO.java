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

	public List<BlockModel> getBlockedByUserId(final Integer id) {
		final String sql = "SELECT * FROM blocks where blocker_id = ?";
		final List<BlockModel> blocks = new ArrayList<>();

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
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

	public List<BlockModel> getBlockedAndBlockerByUserId(final Integer id) {
		final String sql = "SELECT * FROM blocks where blocker_id = ? or blocked_id = ?";
		final List<BlockModel> blocks = new ArrayList<>();

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			stmt.setInt(2, id);
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

	public void blockUser(final Integer blockerId, final Integer blockedId) {
		final String sql = "INSERT INTO blocks (blocker_id, blocked_id) VALUES (?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, blockerId);
			stmt.setInt(2, blockedId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while blocking user", e);
		}
	}

	public void unblockUser(final Integer blockerId, final Integer blockedId) {
		final String sql = "DELETE FROM blocks WHERE blocker_id = ? AND blocked_id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, blockerId);
			stmt.setInt(2, blockedId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while unblocking user", e);
		}
	}

}
