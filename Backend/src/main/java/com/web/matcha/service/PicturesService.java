package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.PicturesDAO;
import com.web.matcha.domain.model.PictureModel;
import com.web.matcha.domain.utils.FileUtils;
import io.javalin.http.UploadedFile;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
public class PicturesService {

	private final PicturesDAO picturesDAO;

	public PictureModel getPicturesById(Integer id) {
		return picturesDAO.getPicturesById(id).orElse(null);
	}

	public void createOrUpdatePicture(Map<String, UploadedFile> pictures) {

		picturesDAO.getPicturesById(UserHolder.getUserId())
				.ifPresent(pictureModel -> {
					FileUtils.deleteFileByFilename(pictureModel.getProfilePicture());
					FileUtils.deleteFileByFilename(pictureModel.getPicture1());
					FileUtils.deleteFileByFilename(pictureModel.getPicture2());
					FileUtils.deleteFileByFilename(pictureModel.getPicture3());
					FileUtils.deleteFileByFilename(pictureModel.getPicture4());
				});

		final PictureModel pictureModel = PictureModel.builder()
				.userId(UserHolder.getUserId())
				.profilePicture(FileUtils.saveUploadedFile(pictures.get("profilePicture")))
				.picture1(FileUtils.saveUploadedFile(pictures.get("picture1")))
				.picture2(FileUtils.saveUploadedFile(pictures.get("picture2")))
				.picture3(FileUtils.saveUploadedFile(pictures.get("picture3")))
				.picture4(FileUtils.saveUploadedFile(pictures.get("picture4")))
				.build();
		picturesDAO.createPicture(pictureModel);
	}
}
