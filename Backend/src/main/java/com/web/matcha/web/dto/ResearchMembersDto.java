package com.web.matcha.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResearchMembersDto {

	/**
	 * The min age of the members.
	 */
	private Integer ageMin;

	/**
	 * The max age of the members.
	 */
	private Integer ageMax;

	/**
	 * The min fame rating of the members.
	 */
	private Integer fameRatingMin;

	/**
	 * The max distance of the members.
	 */
	private Integer distanceMax;

	/**
	 * The interests of the members.
	 */
	private List<String> interests;
}
