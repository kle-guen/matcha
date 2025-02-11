package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.InterestDAO;
import com.web.matcha.domain.dao.ProfileDAO;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.mapper.ProfileMapper;
import com.web.matcha.web.dto.ProfileDto;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.UploadedFile;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ProfileService {

	/**
	 * Profile DAO
	 */
	final private ProfileDAO profileDAO;

	/**
	 * Profile Mapper
	 */
	final private ProfileMapper profileMapper;

	/**
	 * Interest DAO
	 */
	final private InterestDAO interestDAO;

	public ProfileModel getCompletedStatus() {
		final int userId = UserHolder.getUserId();

		return profileDAO.getProfileById(userId).orElse(null);
	}

	/**
	 * Create profile
	 *
	 * @param profileDto
	 */
	public ProfileModel createProfile(ProfileDto profileDto) {
		ProfileModel profileModel = profileMapper.toModel(profileDto);
		interestDAO.setInterestsForUsers(profileDto.getInterests());
		return profileDAO.createProfile(profileModel)
				.orElseThrow(() -> new BadRequestResponse("Error while creating profile"));
	}


	/**
	 * Create profile
	 *
	 * @param profileDto
	 */
	public void updateProfile(ProfileDto profileDto) {
		ProfileModel profileModel = profileMapper.toModel(profileDto);

		interestDAO.deleteInterestsById(UserHolder.getUserId());
		interestDAO.setInterestsForUsers(profileDto.getInterests());
		profileDAO.updateProfile(profileModel);
	}
}
