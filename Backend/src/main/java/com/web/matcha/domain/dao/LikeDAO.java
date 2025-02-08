package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.model.BlockModel;
import com.web.matcha.domain.model.LikeModel;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.HttpResponseException;
import io.javalin.http.HttpStatus;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
public class LikeDAO {

	public List<LikeModel> getLikesByUserId(final Integer id) {
		final String sql = "SELECT * FROM likes where liker_id = ?";
		final List<LikeModel> blocks = new ArrayList<>();

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			final ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				blocks.add(new LikeModel(
						rs.getInt("liker_id"),
						rs.getInt("liked_id"),
						rs.getTimestamp("created_at")
				));
			}

		} catch (SQLException e) {
			log.error("Error while getting likes by user id", e);
			return List.of();
		}
		return blocks;
	}

	public void likeUser(final Integer likerId, final Integer likedId) {
		final String sql = "INSERT INTO likes (liker_id, liked_id, created_at) VALUES (?, ?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, likerId);
			stmt.setInt(2, likedId);
			stmt.setTimestamp(3, Timestamp.from(java.time.Instant.now()));
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while liking user", e);
			throw new BadRequestResponse("Error while liking user");
		}
	}

	public void unlikeUser(final Integer likerId, final Integer likedId) {
		final String sql = "DELETE FROM likes WHERE liker_id = ? AND liked_id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, likerId);
			stmt.setInt(2, likedId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while unliking user", e);
			throw new BadRequestResponse("Error while unliking user");
		}
	}
}
