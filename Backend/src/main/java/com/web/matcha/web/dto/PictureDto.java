package com.web.matcha.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PictureDto {

	private Integer id;

	private Integer userId;

	private String picturePath;

	private boolean isProfilePicture;
}
