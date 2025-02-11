package com.web.matcha.domain.dao;

import com.web.matcha.config.DatabaseConfig;
import com.web.matcha.domain.model.PictureModel;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Slf4j
public class PicturesDAO {

	public Optional<PictureModel> getPicturesById(Integer id) {
		final String sql = "SELECT * FROM public.pictures WHERE user_id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return Optional.of(PictureModel.builder()
						.userId(rs.getInt("user_id"))
						.profilePicture(rs.getString("profile_picture"))
						.picture1(rs.getString("picture1"))
						.picture2(rs.getString("picture2"))
						.picture3(rs.getString("picture3"))
						.picture4(rs.getString("picture4"))
						.build());
			}

		} catch (SQLException e) {
			log.error("Error while getting pictures by id", e);
		}
		return Optional.empty();
	}

	public void createPicture(PictureModel pictureModel) {
		final String sql = "INSERT INTO pictures (user_id, profile_picture, picture1, picture2, picture3, picture4) VALUES (?, ?, ?, ?, ?, ?)"
				+ "ON CONFLICT (user_id) DO UPDATE SET profile_picture = ?, picture1 = ?, picture2 = ?, picture3 = ?, picture4 = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {
			stmt.setInt(1, pictureModel.getUserId());
			stmt.setString(2, pictureModel.getProfilePicture());
			stmt.setString(3, pictureModel.getPicture1());
			stmt.setString(4, pictureModel.getPicture2());
			stmt.setString(5, pictureModel.getPicture3());
			stmt.setString(6, pictureModel.getPicture4());
			stmt.setString(7, pictureModel.getProfilePicture());
			stmt.setString(8, pictureModel.getPicture1());
			stmt.setString(9, pictureModel.getPicture2());
			stmt.setString(10, pictureModel.getPicture3());
			stmt.setString(11, pictureModel.getPicture4());
			stmt.executeUpdate();
		} catch (SQLException e) {
			log.error("Error while creating pictures", e);
		}
	}

}
