package com.web.matcha.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PictureModel {
	private String id;
	private int userId;
	private String picturePath;
	private Boolean isProfilePicture;
}
