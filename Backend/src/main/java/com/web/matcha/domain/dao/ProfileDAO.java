package com.web.matcha.domain.dao;

import com.web.matcha.DatabaseConfig;
import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.enums.GenderEnum;
import com.web.matcha.domain.enums.SexualPreferenceEnum;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.domain.utils.FileUtils;
import io.javalin.http.UploadedFile;
import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Slf4j
public class ProfileDAO {

	/**
	 * Get profile by id
	 *
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
			return Optional.ofNullable(extractProfil(stmt.executeQuery(), false));

		} catch (SQLException e) {
			log.error("Error while getting user by id", e);
		}
		return Optional.empty();
	}

	/**
	 * Create profile
	 *
	 * @param profileModel
	 */
	public Optional<ProfileModel> createProfile(ProfileModel profileModel, List<UploadedFile> pictures) {
		final String sql = "INSERT INTO profiles (gender, sexual_preference, biography, latitude, longitude, city, birthdate, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
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

	public Integer getDistance(final Float latitude1, final Float longitude1, final Float latitude2, final Float longitude2) {
		final String sql = "SELECT calculate_distance(?, ?, ?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setFloat(1, latitude1);
			stmt.setFloat(2, longitude1);
			stmt.setFloat(3, latitude2);
			stmt.setFloat(4, longitude2);
			try (final ResultSet rs = stmt.executeQuery()) {
				if (rs.next()) {
					return rs.getInt(1);
				}
			}
		} catch (SQLException e) {
			log.error("Error while getting distance", e);
		}
		return null;
	}

	/**
	 * Get fame rating
	 *
	 * @param userId
	 */
	public static int getFameRating(final int userId) {
		final String sql = "SELECT calculate_fame_rating(?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, userId);
			try (final ResultSet rs = stmt.executeQuery()) {
				if (rs.next()) {
					return rs.getInt(1);
				}
			}
		} catch (SQLException e) {
			log.error("Error while getting distance", e);
		}
		return 0;
	}

	/**
	 * Extract profile
	 *
	 * @param rs
	 * @param next
	 * @return ProfileModel
	 * @throws SQLException
	 */
	public static ProfileModel extractProfil(final ResultSet rs, final boolean next) throws SQLException {
		if (rs == null) {
			return null;
		}

		if (next || rs.next()) {
			int userId = rs.getInt("user_id");

			return ProfileModel.builder()
					.userId(userId)
					.birthdate(rs.getTimestamp("birthdate"))
					.gender(GenderEnum.valueOf(rs.getString("gender")))
					.sexualPreference(SexualPreferenceEnum.valueOf(rs.getString("sexual_preference")))
					.description(rs.getString("biography"))
					.latitude(rs.getFloat("latitude"))
					.longitude(rs.getFloat("longitude"))
					.city(rs.getString("city"))
					.fameRating(getFameRating(userId))
					.interests(InterestDAO.extractInterests2(rs.getArray("interests_list")))
					.build();
		}
		return null;
	}
}