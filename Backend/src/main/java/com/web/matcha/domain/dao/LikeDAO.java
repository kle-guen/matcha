package com.web.matcha.domain.dao;

import com.web.matcha.config.DatabaseConfig;
import com.web.matcha.domain.model.LikeModel;
import io.javalin.http.BadRequestResponse;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class LikeDAO {

	public List<LikeModel> getLikesByLikerId(final Integer id) {
		final String sql = "SELECT * FROM likes where liker_id = ? AND disliked = FALSE";
		final List<LikeModel> likes = new ArrayList<>();

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			final ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				likes.add(LikeModel.builder()
						.likerId(rs.getInt("liker_id"))
						.likedId(rs.getInt("liked_id"))
						.createdAt(rs.getTimestamp("liked_at"))
						.build());
			}

		} catch (SQLException e) {
			log.error("Error while getting likes by user id", e);
			return List.of();
		}
		return likes;
	}

	public List<LikeModel> getLikesByLikedId(final Integer id) {
		final String sql = "SELECT * FROM likes where liked_id = ?";
		final List<LikeModel> likes = new ArrayList<>();

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			final ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				likes.add(LikeModel.builder()
						.likerId(rs.getInt("liker_id"))
						.likedId(rs.getInt("liked_id"))
						.createdAt(rs.getTimestamp("liked_at"))
						.build());
			}

		} catch (SQLException e) {
			log.error("Error while getting likes by user id", e);
			return List.of();
		}
		return likes;
	}

	public void likeUser(final Integer likerId, final Integer likedId) {
		final String sql = "INSERT INTO likes (liker_id, liked_id) VALUES (?, ?) ON CONFLICT (liker_id, liked_id) DO UPDATE SET disliked = false, liked_at = now()";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, likerId);
			stmt.setInt(2, likedId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while liking user", e);
			throw new BadRequestResponse("Error while liking user");
		}
	}

	public void unlikeUser(final Integer likerId, final Integer likedId) {
		final String sql = "UPDATE likes SET disliked = TRUE WHERE liker_id = ? AND liked_id = ?";

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
