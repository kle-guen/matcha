package com.web.matcha.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {

	/**
	 * The id of the member.
	 */
	private Long id;

	/**
	 * The name of the member.
	 */
	private String name;

	/**
	 * The age of the member.
	 */
	private String age;

	/**
	 * The nickname of the member.
	 */
	private String nickname;

	/**
	 * The gender of the member.
	 */
	private String sexe;

	/**
	 * The description of the member.
	 */
	private String description;
}
