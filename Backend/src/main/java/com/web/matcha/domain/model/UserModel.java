package com.web.matcha.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class UserModel {
	private Integer id;
	private String username;
	private String email;
	private String password_hash;
	private String first_name;
	private String last_name;
	private Boolean is_verified;
	private Timestamp last_login_at;
}
