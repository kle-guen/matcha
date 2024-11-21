package com.web.matcha.web.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
	private Integer id;

	private String username;

	private String email;

	private String password;

	private String first_name;

	private String last_name;
}
