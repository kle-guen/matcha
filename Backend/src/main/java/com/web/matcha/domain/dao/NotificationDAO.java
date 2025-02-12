package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.domain.enums.TypeNotificationEnum;
import com.web.matcha.domain.model.NotificationModel;
import com.web.matcha.web.dto.NotificationDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class NotificationDAO {

	public Optional<List<NotificationModel>> getNotificationsByUserId(int userId) {
		final String sql = "SELECT * FROM notifications WHERE user_id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, userId);
			return Optional.ofNullable(extractNotifications(stmt.executeQuery()));


		} catch (SQLException e) {
			log.error("Error while getting notifications by user id", e);
			return Optional.empty();
		}
	}

	public List<NotificationModel> extractNotifications(final java.sql.ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		List<NotificationModel> notifications = new ArrayList<>();

		while (rs.next()) {
			this.markNotificationAsRead(rs.getInt("id"));
			Optional.of(NotificationModel.builder()
					.id(rs.getInt("id"))
					.userId(rs.getInt("user_id"))
					.type(TypeNotificationEnum.valueOf(rs.getString("type")))
					.username(rs.getString("username"))
					.isRead(rs.getBoolean("is_read"))
					.createdAt(rs.getTimestamp("created_at"))
					.build())
					.ifPresent(notifications::add);
		}
		return notifications;
	}

	public void createNotification(Integer userId, NotificationModel notificationModel) {
		final String sql = "INSERT INTO notifications (user_id, type, username, is_read) VALUES (?, ?, ?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, userId);
			stmt.setString(2, notificationModel.getType().name());
			stmt.setString(3, notificationModel.getUsername());
			stmt.setBoolean(4, notificationModel.getIsRead());

			try (final ResultSet generatedKeys = stmt.getGeneratedKeys()) {
				if (generatedKeys.next()) {
					notificationModel.setId(generatedKeys.getInt(1));
				}
			}
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while creating notification", e);
		}
	}

	public void markNotificationAsRead(int notificationId) {
		final String sql = "UPDATE notifications SET is_read = true WHERE id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, notificationId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while marking notification as read", e);
		}
	}
}
