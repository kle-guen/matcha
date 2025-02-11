package com.web.matcha.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.service.PicturesService;
import com.web.matcha.service.ProfileService;
import com.web.matcha.web.dto.ProfileDto;
import io.javalin.Javalin;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.http.UploadedFile;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class ProfileController extends AbstractController {

	/**
	 * Profile service
	 */
	private final ProfileService profileService;

	private final PicturesService picturesService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/profiles/is-complete", this::isProfileComplete);
		app.post("/profiles", this::createProfile);
		app.put("/profiles", this::updateProfile);
	}

	/**
	 * Check if profile is complete
	 *
	 * @param ctx
	 */
	private void isProfileComplete(final Context ctx) {
		final ProfileModel profileModel = profileService.getCompletedStatus();
		ctx.status(HttpStatus.ACCEPTED).json(profileModel != null);
	}

	/**
	 * Create profile
	 *
	 * @param ctx
	 */
	private void createProfile(final Context ctx) {
		String profileInfo = ctx.formParam("profileData");
		Map<String, UploadedFile> pictures = new HashMap<>();
		pictures.put("profilePicture", ctx.uploadedFile("profilePicture"));
		pictures.put("picture1", ctx.uploadedFile("picture1"));
		pictures.put("picture2", ctx.uploadedFile("picture2"));
		pictures.put("picture3", ctx.uploadedFile("picture3"));
		pictures.put("picture4", ctx.uploadedFile("picture4"));

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			ProfileDto profileDto = objectMapper.readValue(profileInfo, ProfileDto.class);
			profileService.createProfile(profileDto);
		} catch (Exception e) {
			throw new BadRequestResponse("Invalid profile data");
		}

		picturesService.createOrUpdatePicture(pictures);
		ctx.status(HttpStatus.CREATED);
	}

	/**
	 * Create profile
	 *
	 * @param ctx
	 */
	private void updateProfile(final Context ctx) {
		String profileInfo = ctx.formParam("profileData");
		Map<String, UploadedFile> pictures = new HashMap<>();
		pictures.put("profilePicture", ctx.uploadedFile("profilePicture"));
		pictures.put("picture1", ctx.uploadedFile("picture1"));
		pictures.put("picture2", ctx.uploadedFile("picture2"));
		pictures.put("picture3", ctx.uploadedFile("picture3"));
		pictures.put("picture4", ctx.uploadedFile("picture4"));

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			ProfileDto profileDto = objectMapper.readValue(profileInfo, ProfileDto.class);
			profileService.updateProfile(profileDto);
		} catch (Exception e) {
			throw new BadRequestResponse("Invalid profile data");
		}

		picturesService.createOrUpdatePicture(pictures);
		ctx.status(HttpStatus.OK);
	}
}
