package com.web.matcha.domain.enums;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum SexualPreferenceEnum {
	HETEROSEXUAL,
	HOMOSEXUAL,
	BISEXUAL;

	public static List<AbstractMap.SimpleEntry<SexualPreferenceEnum, GenderEnum>> searchedGender(final SexualPreferenceEnum sexualPreference, final GenderEnum gender) {
		final List<AbstractMap.SimpleEntry<SexualPreferenceEnum, GenderEnum>> searchedGender = new ArrayList<>();

		switch (sexualPreference) {
			case HETEROSEXUAL:
				if (GenderEnum.FEMALE.equals(gender)) {
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.HETEROSEXUAL, GenderEnum.MALE));
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.BISEXUAL, GenderEnum.MALE));
				} else {
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.HETEROSEXUAL, GenderEnum.FEMALE));
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.BISEXUAL, GenderEnum.FEMALE));
				}
				break;
			case HOMOSEXUAL:
				if (GenderEnum.FEMALE.equals(gender)) {
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.HOMOSEXUAL, GenderEnum.FEMALE));
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.BISEXUAL, GenderEnum.FEMALE));
				} else {
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.HOMOSEXUAL, GenderEnum.MALE));
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.BISEXUAL, GenderEnum.MALE));
				}
				break;
			case BISEXUAL:
				searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.BISEXUAL, GenderEnum.MALE));
				searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.BISEXUAL, GenderEnum.FEMALE));
				if (GenderEnum.FEMALE.equals(gender)) {
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.HOMOSEXUAL, GenderEnum.FEMALE));
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.HETEROSEXUAL, GenderEnum.MALE));
				} else {
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.HETEROSEXUAL, GenderEnum.FEMALE));
					searchedGender.add(new AbstractMap.SimpleEntry<>(SexualPreferenceEnum.HOMOSEXUAL, GenderEnum.MALE));
				}
				break;
			default:
				break;
		}

		return searchedGender;
	}
}
