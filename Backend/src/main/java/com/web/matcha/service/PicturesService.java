package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.PicturesDAO;
import com.web.matcha.domain.model.PictureModel;
import com.web.matcha.domain.utils.FileUtils;
import lombok.RequiredArgsConstructor;

import java.io.InputStream;
import java.util.Map;

@RequiredArgsConstructor
public class PicturesService {

    private final PicturesDAO picturesDAO;

    public PictureModel getPicturesById(Integer id) throws Exception {
        return picturesDAO.getPicturesById(id)
                .orElseThrow(() -> new Exception("Pictures not found for user ID: " + id));
    }

    public void createOrUpdatePicture(Map<String, InputStream> pictures, Map<String, String> filenames) throws Exception {
        Integer userId = UserHolder.getUserId();

        picturesDAO.getPicturesById(userId)
                .ifPresent(pictureModel -> {
                    FileUtils.deleteFileByFilename(pictureModel.getProfilePicture());
                    FileUtils.deleteFileByFilename(pictureModel.getPicture1());
                    FileUtils.deleteFileByFilename(pictureModel.getPicture2());
                    FileUtils.deleteFileByFilename(pictureModel.getPicture3());
                    FileUtils.deleteFileByFilename(pictureModel.getPicture4());
                });

        final PictureModel pictureModel = PictureModel.builder()
                .userId(userId)
                .profilePicture(FileUtils.saveUploadedFile(pictures.get("profilePicture"), filenames.get("profilePicture")))
                .picture1(FileUtils.saveUploadedFile(pictures.get("picture1"), filenames.get("picture1")))
                .picture2(FileUtils.saveUploadedFile(pictures.get("picture2"), filenames.get("picture2")))
                .picture3(FileUtils.saveUploadedFile(pictures.get("picture3"), filenames.get("picture3")))
                .picture4(FileUtils.saveUploadedFile(pictures.get("picture4"), filenames.get("picture4")))
                .build();
        picturesDAO.createPicture(pictureModel);
    }
}