package com.web.matcha.web.controller;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.enums.EmailTokenTypeEnum;
import com.web.matcha.domain.model.PictureModel;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.domain.utils.FileUtils;
import com.web.matcha.service.EmailService;
import com.web.matcha.service.PicturesService;
import com.web.matcha.service.UserService;
import com.web.matcha.web.dto.UserDto;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class UserController extends AbstractController {

	private final UserService userService;
	private final EmailService emailService;
	private final PicturesService picturesService;

	@Override
	public void registerRoutes(final Javalin app) {
		//GET
		app.get("/users/me", this::getMyUser);

		//POST
		app.post("/users", this::createUser);

		//PUT
		app.put("/users", this::updateUser);
	}

	private void getMyUser(final Context ctx) {
		final int id = UserHolder.getUserId();

		final UserModel userModel = userService.getUserById(id);

		Map<String, Object> response = new HashMap<>();
		response.put("user", userModel);

		PictureModel pictureModel = picturesService.getPicturesById(id);
		if (pictureModel == null) {
			ctx.status(HttpStatus.ACCEPTED.getCode()).json(response);
			return;
		}
		response.put("profilePicture", FileUtils.getBase64Image(pictureModel.getProfilePicture()));
		response.put("picture1", FileUtils.getBase64Image(pictureModel.getPicture1()));
		response.put("picture2", FileUtils.getBase64Image(pictureModel.getPicture2()));
		response.put("picture3", FileUtils.getBase64Image(pictureModel.getPicture3()));
		response.put("picture4", FileUtils.getBase64Image(pictureModel.getPicture4()));

		ctx.status(HttpStatus.ACCEPTED.getCode()).json(response);
	}

	private void createUser(final Context ctx) {
		UserDto userDto = ctx.bodyAsClass(UserDto.class);
		userService.addUser(userDto);
		emailService.sendEmail(userDto.getEmail(), EmailTokenTypeEnum.VERIFY_EMAIL);
		ctx.status(HttpStatus.CREATED.getCode()).json(userDto);
	}

	private void updateUser(final Context ctx) {
		UserDto userDto = ctx.bodyAsClass(UserDto.class);
		userService.updateUser(userDto);
		ctx.status(HttpStatus.OK.getCode());
	}
}
