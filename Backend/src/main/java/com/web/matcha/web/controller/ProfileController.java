package com.web.matcha.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.service.PicturesService;
import com.web.matcha.service.ProfileService;
import com.web.matcha.web.dto.ProfileDto;
import lombok.RequiredArgsConstructor;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.Part;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

@RequiredArgsConstructor
public class ProfileController extends AbstractController {

    private final ProfileService profileService;
    private final PicturesService picturesService;
    private final ObjectMapper objectMapper = new ObjectMapper(); // Use Jackson ObjectMapper

    @Override
    public void registerRoutes() {
        get("/profiles/is-complete", this::isProfileComplete);
        post("/profiles", this::createProfile);
        put("/profiles", this::updateProfile);
    }

    private Object isProfileComplete(spark.Request request, spark.Response response) throws Exception {
        ProfileModel profileModel = profileService.getCompletedStatus();
        response.status(202);
        response.type("application/json");
        return objectMapper.writeValueAsString(profileModel != null);
    }

    private Object createProfile(spark.Request request, spark.Response response) throws Exception {
        request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));

        String profileInfo = request.raw().getParameter("profileData");
        Map<String, InputStream> pictures = new HashMap<>();
        Map<String, String> filenames = new HashMap<>();

        for (Part part : request.raw().getParts()) {
            if (part.getName().equals("profilePicture") || part.getName().startsWith("picture")) {
                pictures.put(part.getName(), part.getInputStream());
                filenames.put(part.getName(), part.getSubmittedFileName());
            }
        }

        try {
            ProfileDto profileDto = objectMapper.readValue(profileInfo, ProfileDto.class);
            profileService.createProfile(profileDto);
        } catch (Exception e) {
            response.status(400);
            return "Invalid profile data";
        }

        picturesService.createOrUpdatePicture(pictures, filenames);
        response.status(201);
        return "Profile created successfully";
    }

    private Object updateProfile(spark.Request request, spark.Response response) throws Exception {
        request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));

        String profileInfo = request.raw().getParameter("profileData");
        Map<String, InputStream> pictures = new HashMap<>();
        Map<String, String> filenames = new HashMap<>();

        for (Part part : request.raw().getParts()) {
            if (part.getName().equals("profilePicture") || part.getName().startsWith("picture")) {
                pictures.put(part.getName(), part.getInputStream());
                filenames.put(part.getName(), part.getSubmittedFileName());
            }
        }

        try {
            ProfileDto profileDto = objectMapper.readValue(profileInfo, ProfileDto.class);
            profileService.updateProfile(profileDto);
        } catch (Exception e) {
            response.status(400);
            return "Invalid profile data";
        }

        picturesService.createOrUpdatePicture(pictures, filenames);
        response.status(200);
        return "Profile updated successfully";
    }
}