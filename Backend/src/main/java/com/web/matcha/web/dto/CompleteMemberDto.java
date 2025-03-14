package com.web.matcha.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CompleteMemberDto extends MemberDto {

	private String city;

	private List<String> lookingFor;

	private InterestDto[] interests;

	private float fameRating;

	private boolean liked;

}
