package com.web.matcha.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.matcha.mapper.ProfileMapper;
import com.web.matcha.web.dto.ProfileDto;
import io.javalin.Javalin;
import io.javalin.http.Context;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.service.ProfileService;
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
		app.get("/profiles/{id}", this::getProfileById);
		app.post("/profiles", this::createProfile);
	}

	private void getMyProfile(final Context ctx) {
		final ProfileModel profileModel = profileService.getMyProfile();
		ctx.status(200).json(profileModel);
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
			ctx.status(400).result("Invalid id");
			return;
		}
		final ProfileModel profileModel = profileService.getProfileById(id);
		ctx.status(200).json(profileModel);
	}

	/**
	 * Create profile
	 * @param ctx
	 */
	private void createProfile(final Context ctx) {
		String profileInfo = ctx.formParam("profileData");
		List<UploadedFile> pictures = ctx.uploadedFiles("pictures");

		final ProfileModel createdProfile = profileService.createProfile(profileInfo, pictures);
		ctx.status(201).json(createdProfile);
	}
}
