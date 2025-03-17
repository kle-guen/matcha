package com.web.matcha.domain.dao;

import com.web.matcha.config.DatabaseConfig;
import com.web.matcha.domain.model.MessageModel;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class MessageDAO {

	public void createMessage(MessageModel message) {
		final String sql = "INSERT INTO messages (sender_id, receiver_id, content, created_at) VALUES (?, ?, ?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, message.getSenderId());
			stmt.setInt(2, message.getReceiverId());
			stmt.setString(3, message.getContent());
			stmt.setTimestamp(4, message.getCreatedAt());
			stmt.executeUpdate();
		} catch (SQLException e) {
			log.error("Error while creating chat", e);
		}
	}

	public List<MessageModel> getMessagesById(final Integer userId) {
		final String sql = "SELECT * FROM messages WHERE receiver_id = ? OR sender_id = ?";
		final List<MessageModel> messages = new ArrayList<>();

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {
			stmt.setInt(1, userId);
			stmt.setInt(2, userId);

			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				messages.add(MessageModel.builder()
						.id(rs.getInt("id"))
						.senderId(rs.getInt("sender_id"))
						.receiverId(rs.getInt("receiver_id"))
						.content(rs.getString("content"))
						.createdAt(rs.getTimestamp("created_at"))
						.isRead(rs.getBoolean("is_read"))
						.build());
			}

		} catch (SQLException e) {
			log.error("Error while getting messages", e);
			return null;
		}

		return messages;
	}

	public void readMessages(int userId, int senderId) {
		final String sql = "UPDATE messages SET is_read = true WHERE receiver_id = ? AND sender_id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {
			stmt.setInt(1, userId);
			stmt.setInt(2, senderId);
			stmt.executeUpdate();
		} catch (SQLException e) {
			log.error("Error while reading messages", e);
		}
	}

}
