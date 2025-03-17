package com.web.matcha.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CompleteMemberDto extends MemberDto {

	private String city;

	private List<String> lookingFor;

	private InterestDto[] interests;

	private float fameRating;

	private boolean liked;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime lastConnection;

}
