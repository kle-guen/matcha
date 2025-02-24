package com.web.matcha.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.enums.EmailTokenTypeEnum;
import com.web.matcha.domain.model.PictureModel;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.domain.utils.FileUtils;
import com.web.matcha.service.EmailService;
import com.web.matcha.service.PicturesService;
import com.web.matcha.service.UserService;
import com.web.matcha.web.dto.UserDto;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

@RequiredArgsConstructor
public class UserController extends AbstractController {

    private final UserService userService;
    private final EmailService emailService;
    private final PicturesService picturesService;
    private final ObjectMapper objectMapper = new ObjectMapper(); // Use Jackson ObjectMapper

    @Override
    public void registerRoutes() {
        // GET
        get("/users/me", this::getMyUser);

        // POST
        post("/users", this::createUser);

        // PUT
        put("/users", this::updateUser);
    }

    private Object getMyUser(spark.Request request, spark.Response response) throws Exception {
        final int id = UserHolder.getUserId();

        final UserModel userModel = userService.getUserById(id);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("user", userModel);

        PictureModel pictureModel = picturesService.getPicturesById(id);
        if (pictureModel != null) {
            responseData.put("profilePicture", FileUtils.getBase64Image(pictureModel.getProfilePicture()));
            responseData.put("picture1", FileUtils.getBase64Image(pictureModel.getPicture1()));
            responseData.put("picture2", FileUtils.getBase64Image(pictureModel.getPicture2()));
            responseData.put("picture3", FileUtils.getBase64Image(pictureModel.getPicture3()));
            responseData.put("picture4", FileUtils.getBase64Image(pictureModel.getPicture4()));
        }

        response.status(202);
        response.type("application/json");
        return objectMapper.writeValueAsString(responseData);
    }

    private Object createUser(spark.Request request, spark.Response response) throws Exception {
        UserDto userDto = objectMapper.readValue(request.body(), UserDto.class);
        userService.addUser(userDto);
        emailService.sendEmail(userDto.getEmail(), EmailTokenTypeEnum.VERIFY_EMAIL);
        response.status(201);
        response.type("application/json");
        return objectMapper.writeValueAsString(userDto);
    }

    private Object updateUser(spark.Request request, spark.Response response) throws Exception {
        UserDto userDto = objectMapper.readValue(request.body(), UserDto.class);
        userService.updateUser(userDto);
        response.status(200);
        return "User updated successfully";
    }
}