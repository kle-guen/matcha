package com.web.matcha.domain.enums;

public enum SortResearchUsersEnum {
	AGE,
	FAME_RATING,
	COMMON_INTERESTS,
	DISTANCE;

	public static SortResearchUsersEnum getValue(final String value) {
		if (value == null) {
			return null;
		}
		return valueOf(value);
	}
}
