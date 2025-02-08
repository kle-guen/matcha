package com.web.matcha.web.dto;

import com.web.matcha.domain.enums.GenderEnum;
import com.web.matcha.domain.enums.SexualPreferenceEnum;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class ProfileDto {

	private Integer id;

	private GenderEnum gender;

	private SexualPreferenceEnum sexualPreference;

	private String description;

	private Timestamp birthdate;

	private LocationDto location;

	private List<String> interests;

	private List<PictureDto> pictures;
}
