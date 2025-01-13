package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.enums.GenderEnum;
import com.web.matcha.domain.enums.SexualPreferenceEnum;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.domain.utils.FileUtils;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import io.javalin.http.UploadedFile;

@Slf4j
public class ProfileDAO {

	/**
	 * Get profile by id
	 * @param id
	 */
	public Optional<ProfileModel> getProfileById(Integer id) {
		final String sql = "SELECT public.profiles.*, array_agg(public.interests.*) AS interests_list "
				+ "FROM public.profiles "
				+ "LEFT JOIN public.user_interests ON public.profiles.user_id = public.user_interests.user_id "
				+ "LEFT JOIN public.interests ON public.user_interests.interest_code = public.interests.code "
				+ "WHERE public.profiles.user_id = ? "
				+ "GROUP BY public.profiles.user_id";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			return Optional.of(extractProfil(stmt.executeQuery()));

		} catch (SQLException e) {
			log.error("Error while getting user by id", e);
		}
		return Optional.empty();
	}

	/**
	 * Create profile
	 * @param profileModel
	 */
	public Optional<ProfileModel> createProfile(ProfileModel profileModel, List<UploadedFile> pictures) {
		final String sql = "INSERT INTO profiles (gender, sexual_preference, biography, latitude, longitude, city, fame_rating, birthdate, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		final String pictureSql = "INSERT INTO pictures (user_id, picture_path, is_profile_picture) VALUES (?, ?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		    final PreparedStatement stmt = conn.prepareStatement(sql)) {
			final int userId = UserHolder.getUserId();

			stmt.setString(1, profileModel.getGender().toString());
			stmt.setString(2, profileModel.getSexualPreference().toString());
			stmt.setString(3, profileModel.getDescription());
			stmt.setFloat(4, profileModel.getLatitude());
			stmt.setFloat(5, profileModel.getLongitude());
			stmt.setString(6, profileModel.getCity());
			stmt.setFloat(7, profileModel.getFameRating());
			stmt.setTimestamp(8, profileModel.getBirthdate());
			stmt.setInt(9, userId);
			stmt.executeUpdate();

			try (PreparedStatement pictureStmt = conn.prepareStatement(pictureSql)) {
				for (UploadedFile picture : pictures) {
					String filePath = FileUtils.saveUploadedFile(picture);
					pictureStmt.setInt(1, userId);
					pictureStmt.setString(2, filePath);
					pictureStmt.setBoolean(3, pictures.indexOf(picture) == 0);
					pictureStmt.executeUpdate();
				}
			}
		} catch (SQLException e) {
			log.error("Error while inserting user", e);
			return Optional.empty();
		}

		return Optional.of(profileModel);
	}

	public static ProfileModel extractProfil(final ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		if (rs.next()) {
			return ProfileModel.builder()
					.userId(rs.getInt("user_id"))
					.gender(GenderEnum.valueOf(rs.getString("gender")))
					.sexualPreference(SexualPreferenceEnum.valueOf(rs.getString("sexual_preference")))
					.description(rs.getString("biography"))
					.latitude(rs.getFloat("latitude"))
					.longitude(rs.getFloat("longitude"))
					.city(rs.getString("city"))
					.fameRating(rs.getFloat("fame_rating"))
					.interest(InterestDAO.extractInterests(Optional.ofNullable(rs.getArray("interests_list")).orElse(null).getResultSet()))
					.build();
		}
		return null;
	}
}