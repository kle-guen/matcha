package com.web.matcha.service;


import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.InterestDAO;
import com.web.matcha.domain.dao.ProfileDAO;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.mapper.ProfileMapper;
import com.web.matcha.web.dto.ProfileDto;
import lombok.RequiredArgsConstructor;

import static spark.Spark.halt;

@RequiredArgsConstructor
public class ProfileService {

    private final ProfileDAO profileDAO;
    private final ProfileMapper profileMapper;
    private final InterestDAO interestDAO;

    public ProfileModel getCompletedStatus() throws Exception {
        final int userId = UserHolder.getUserId();

        return profileDAO.getProfileById(userId)
                .orElseThrow(() ->  halt(404, "Profile not found"));
    }

    public ProfileModel createProfile(ProfileDto profileDto) throws Exception {
        ProfileModel profileModel = profileMapper.toModel(profileDto);
        interestDAO.setInterestsForUsers(profileDto.getInterests());
        return profileDAO.createProfile(profileModel)
                .orElseThrow(() -> halt(400, "Profile already exists"));
    }

    public void updateProfile(ProfileDto profileDto) throws Exception {
        ProfileModel profileModel = profileMapper.toModel(profileDto);

        interestDAO.deleteInterestsById(UserHolder.getUserId());
        interestDAO.setInterestsForUsers(profileDto.getInterests());
        profileDAO.updateProfile(profileModel);
    }
}