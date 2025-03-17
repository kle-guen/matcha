package com.web.matcha.domain.dao;

import com.web.matcha.config.DatabaseConfig;
import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.enums.SexualPreferenceEnum;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.web.dto.ResearchMembersDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static com.web.matcha.domain.utils.PasswordUtils.hashPassword;

@Slf4j
@RequiredArgsConstructor
public class UserDAO {

	public List<UserModel> researchMembers(final ResearchMembersDto researchMembersDto, final ProfileModel currentUserProfile) {
		final List<UserModel> users = new ArrayList<>();

		//Generate the gender condition
		final List<String> searchedGender = SexualPreferenceEnum.searchedGender(currentUserProfile.getSexualPreference(), currentUserProfile.getGender()).stream()
				.map(entry -> "(gender = '" + entry.getValue() + "' AND sexual_preference = '" + entry.getKey() + "')")
				.toList();
		final String genderCondition = "(" + StringUtils.join(searchedGender, " OR ") + ")";

		if (researchMembersDto.getInterests() == null) {
			researchMembersDto.setInterests(new ArrayList<>());
		}

		//Generate the interests condition
		final String interestsCondition = StringUtils.join(Collections.nCopies(researchMembersDto.getInterests().size(), "?"), ",");

		//Filters
		final String filters = "WHERE " + StringUtils.join(Stream.of(
								"id != " + UserHolder.getUserId(),
								genderCondition,
								StringUtils.isNotBlank(interestsCondition) ? "public.interests.code IN (" + interestsCondition + ") " : null,
								researchMembersDto.getAgeMin() != null ? "birthdate < get_date_minus_years(?)" : null,
								researchMembersDto.getAgeMax() != null ? "birthdate > get_date_minus_years(?)" : null,
								researchMembersDto.getFameRatingMin() != null ? "calculate_fame_rating(users.id) >= ?" : null,
								researchMembersDto.getDistanceMax() != null ? "calculate_distance(latitude, longitude, ?, ?) <= ?" : null)
						.filter(StringUtils::isNotBlank)
						.toList(),
				" AND ");

		//Query
		final String sql = "SELECT public.users.*, public.profiles.*, array_agg(public.interests.*) AS interests_list "
				+ "FROM public.users "
				+ "JOIN public.profiles ON public.profiles.user_id = public.users.id "
				+ "LEFT JOIN public.user_interests ON public.users.id = public.user_interests.user_id "
				+ "LEFT JOIN public.interests ON public.user_interests.interest_code = public.interests.code "
				+ filters
				+ " GROUP BY public.users.id, public.profiles.user_id";


		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			//Set the parameters
			int i = 1;
			while (i <= researchMembersDto.getInterests().size()) {
				stmt.setString(i, researchMembersDto.getInterests().get(i - 1));
				i++;
			}
			if (researchMembersDto.getAgeMin() != null) {
				stmt.setInt(i++, researchMembersDto.getAgeMin());
			}
			if (researchMembersDto.getAgeMax() != null) {
				stmt.setInt(i++, researchMembersDto.getAgeMax() + 1);
			}
			if (researchMembersDto.getFameRatingMin() != null) {
				stmt.setFloat(i++, researchMembersDto.getFameRatingMin());
			}
			if (researchMembersDto.getDistanceMax() != null) {
				stmt.setFloat(i++, currentUserProfile.getLatitude());
				stmt.setFloat(i++, currentUserProfile.getLongitude());
				stmt.setFloat(i, researchMembersDto.getDistanceMax());
			}
			final ResultSet rs = stmt.executeQuery();

			//Get the users
			for (UserModel user = extractUserWithProfile(rs); user != null; user = extractUserWithProfile(rs)) {
				users.add(user);
			}

		} catch (SQLException e) {
			log.error("Error while getting user by id", e);
		}
		return users;
	}

	public Optional<UserModel> getUserById(final Integer id) {
		final String sql = "SELECT public.users.*, public.profiles.*, array_agg(public.interests.*) AS interests_list "
				+ "FROM public.users "
				+ "JOIN public.profiles ON public.profiles.user_id = public.users.id "
				+ "LEFT JOIN public.user_interests ON public.profiles.user_id = public.user_interests.user_id "
				+ "LEFT JOIN public.interests ON public.user_interests.interest_code = public.interests.code "
				+ "WHERE public.users.id = ?"
				+ " GROUP BY public.users.id, public.profiles.user_id";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			return Optional.ofNullable(extractUserWithProfile(stmt.executeQuery()));

		} catch (SQLException e) {
			log.error("Error while getting user by id", e);
		}
		return Optional.empty();
	}

	public Optional<UserModel> getUserByUsername(final String username, final String password) {
		String sql = "SELECT * FROM users WHERE username = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, username);
			return Optional.ofNullable(extractUser(stmt.executeQuery()));

		} catch (SQLException e) {
			log.error("Error while getting user by email", e);
		}
		return Optional.empty();
	}

	public List<UserModel> getMatches(final int userId) {
		String sql = "SELECT u.* FROM users u "
				+ "JOIN likes l1 ON u.id = l1.liked_id "
				+ "JOIN likes l2 ON u.id = l2.liker_id "
				+ "WHERE l1.liker_id = ? "
				+ "AND l2.liked_id = ? "
				+ "AND l1.disliked = false "
				+ "AND l2.disliked = false "
				+ "AND u.id <> ?";

		final List<UserModel> users = new ArrayList<>();

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, userId);
			stmt.setInt(2, userId);
			stmt.setInt(3, userId);
			final ResultSet rs = stmt.executeQuery();
			UserModel u = extractUser(rs);
			while (u != null) {
				users.add(u);
				u = extractUser(rs);
			}
		} catch (SQLException e) {
			log.error("Error while getting matches", e);
		}
		return users;
	}


	public Optional<UserModel> insertUser(UserModel userModel) {
		final String sql = "INSERT INTO users (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

			stmt.setString(1, userModel.getUsername());
			stmt.setString(2, userModel.getEmail());
			stmt.setString(3, hashPassword(userModel.getPassword()));
			stmt.setString(4, userModel.getFirstName());
			stmt.setString(5, userModel.getLastName());
			stmt.executeUpdate();

			try (final ResultSet generatedKeys = stmt.getGeneratedKeys()) {
				if (generatedKeys.next()) {
					int userId = generatedKeys.getInt(1);
					userModel.setId(userId);
					UserHolder.setUserId(userId);
				}
			}

		} catch (SQLException e) {
			log.error("Error while inserting user", e);
			return Optional.empty();
		}

		return Optional.of(userModel);
	}

	public void updateUser(UserModel userModel) {
		final String sql = "UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ? WHERE id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, userModel.getUsername());
			stmt.setString(2, userModel.getEmail());
			stmt.setString(3, userModel.getFirstName());
			stmt.setString(4, userModel.getLastName());
			stmt.setInt(5, UserHolder.getUserId());
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while updating user", e);
		}
	}

	public static UserModel extractUser(final ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		if (rs.next()) {
			return UserModel.builder()
					.id(rs.getInt("id"))
					.email(rs.getString("email"))
					.username(rs.getString("username"))
					.firstName(rs.getString("first_name"))
					.lastName(rs.getString("last_name"))
					.verified(rs.getBoolean("is_verified"))
					.lastLoginAt(rs.getTimestamp("last_login_at"))
					.password(rs.getString("password"))
					.build();
		}
		return null;
	}

	public void verifyUserEmail(int userId) {
		final String sql = "UPDATE users SET is_verified = true WHERE id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, userId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while verifying user email", e);
		}
	}

	public void deleteUserByEmail(String email) {
		final String sql = "DELETE FROM users WHERE email = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, email);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while deleting user by email", e);
		}
	}

	public static UserModel extractUserWithProfile(final ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		if (rs.next()) {
			return UserModel.builder()
					.id(rs.getInt("id"))
					.email(rs.getString("email"))
					.username(rs.getString("username"))
					.firstName(rs.getString("first_name"))
					.lastName(rs.getString("last_name"))
					.verified(rs.getBoolean("is_verified"))
					.lastLoginAt(rs.getTimestamp("last_login_at"))
					.profile(ProfileDAO.extractProfil(rs, true))
					.build();
		}
		return null;
	}

	public Optional<String> getUsernameById(final Integer id) {
		final String sql = "SELECT username FROM users WHERE id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, id);
			final ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return Optional.ofNullable(rs.getString("username"));
			}

		} catch (SQLException e) {
			log.error("Error while getting nickname by id", e);
		}
		return Optional.empty();
	}

	public void resetPassword(int userId, String password) {
		final String sql = "UPDATE users SET password = ? WHERE id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, hashPassword(password));
			stmt.setInt(2, userId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while resetting password", e);
		}
	}

	public Optional<Integer> getUserIdByEmail(String email) {
		final String sql = "SELECT id FROM users WHERE email = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, email);
			final ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return Optional.of(rs.getInt("id"));
			}

		} catch (SQLException e) {
			log.error("Error while getting user id by email", e);
		}
		return Optional.empty();
	}

	public void updateLastConnection(int userId) {
		final String sql = "UPDATE users SET last_login_at = now() WHERE id = ?";

		try (final Connection conn = DatabaseConfig.getDataSource().getConnection();
		     final PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, userId);
			stmt.executeUpdate();

		} catch (SQLException e) {
			log.error("Error while updating last connection", e);
		}
	}
}
