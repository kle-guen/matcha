package com.web.matcha.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class UserModel {
	private Integer id;

	private String username;

	private String email;

	private String password;

	private String firstName;

	private String lastName;

	private Boolean verified;

	private Timestamp lastLoginAt;

	private ProfileModel profile;
}
