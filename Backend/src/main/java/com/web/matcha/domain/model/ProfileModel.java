package com.web.matcha.domain.model;

import com.web.matcha.domain.enums.GenderEnum;
import com.web.matcha.domain.enums.SexualPreferenceEnum;
import com.web.matcha.web.dto.PictureDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class ProfileModel {
	private Integer userId;

	private GenderEnum gender;

	private SexualPreferenceEnum sexualPreference;

	private String description;

	private Float latitude;

	private Float longitude;

	private String city;

	private Float fameRating;

	private Timestamp birthdate;
}
