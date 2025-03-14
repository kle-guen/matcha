package com.web.matcha.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ResultResearchDto {

	private List<MemberDto> members;

	private Integer nbPages;

}
