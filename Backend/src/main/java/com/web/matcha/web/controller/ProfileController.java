package com.web.matcha.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.matcha.mapper.ProfileMapper;
import com.web.matcha.web.dto.ProfileDto;
import io.javalin.Javalin;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.service.ProfileService;
import io.javalin.http.HttpStatus;
import io.javalin.http.UploadedFile;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ProfileController extends AbstractController {

	/**
	 * Profile service
	 */
	private final ProfileService profileService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/profiles/me", this::getMyProfile);
		app.get("/profiles/is-complete", this::isProfileComplete);
		app.get("/profiles/{id}", this::getProfileById);
		app.post("/profiles", this::createProfile);
	}

	/**
	 * Get my profile
	 * @param ctx
	 */
	private void getMyProfile(final Context ctx) {
		final ProfileModel profileModel = profileService.getMyProfile();
		ctx.status(HttpStatus.ACCEPTED).json(profileModel);
	}

	/**
	 * Check if profile is complete
	 * @param ctx
	 */
	private void isProfileComplete(final Context ctx) {
		final ProfileModel profileModel = profileService.getCompletedStatus();
		ctx.status(HttpStatus.ACCEPTED).json(profileModel != null);
	}

	/**
	 * Get profile by id
	 * @param ctx
	 */
	private void getProfileById(final Context ctx) {
		final int id;
		try {
			id = Integer.parseInt(ctx.pathParam("id"));
		} catch (NumberFormatException e) {
			throw new BadRequestResponse("Invalid id");
		}
		final ProfileModel profileModel = profileService.getProfileById(id);
		ctx.status(HttpStatus.ACCEPTED).json(profileModel);
	}

	/**
	 * Create profile
	 * @param ctx
	 */
	private void createProfile(final Context ctx) {
		String profileInfo = ctx.formParam("profileData");
		List<UploadedFile> pictures = ctx.uploadedFiles("pictures");

		final ProfileModel createdProfile = profileService.createProfile(profileInfo, pictures);
		ctx.status(HttpStatus.CREATED).json(createdProfile);
	}
}
