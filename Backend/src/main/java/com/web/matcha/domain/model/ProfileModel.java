package com.web.matcha.domain.model;

import com.web.matcha.domain.enums.GenderEnum;
import com.web.matcha.domain.enums.SexualPreferenceEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProfileModel {
	int user_id;

	GenderEnum gender;

	SexualPreferenceEnum sexualPreference;

	String biography;

	Float latitude;

	Float longitude;

	String city;

	Float fameRating;
}
