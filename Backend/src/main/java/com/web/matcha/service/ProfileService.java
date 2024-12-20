package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.ProfileDAO;
import com.web.matcha.mapper.ProfileMapper;
import com.web.matcha.domain.model.ProfileModel;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.UploadedFile;
import lombok.RequiredArgsConstructor;
import com.web.matcha.web.dto.ProfileDto;
import com.fasterxml.jackson.databind.ObjectMapper;

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
	 * Get profile by id
	 * @param id
	 */
	public ProfileModel getProfileById(int id) {
		return profileDAO.getProfileById(id)
				.orElseThrow(() -> new BadRequestResponse("Profile not found"));
	}

	/**
	 * Create profile
	 * @param profileInfo
	 * @param pictures
	 */
	public ProfileModel createProfile(String profileInfo, List<UploadedFile> pictures) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			ProfileDto profileDto = objectMapper.readValue(profileInfo, ProfileDto.class);
			ProfileModel profileModel = profileMapper.toModel(profileDto);
			profileModel.setFameRating(0.0f);
			return profileDAO.createProfile(profileModel, pictures)
					.orElseThrow(() -> new BadRequestResponse("Error while creating profile"));
		}
		catch (Exception e) {
			throw new BadRequestResponse("Invalid profile data");
		}

	}
}
