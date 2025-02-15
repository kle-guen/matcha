package com.web.matcha.domain.model;

import com.web.matcha.domain.enums.EmailTokenTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class EmailTokenModel {
	int userId;
	String token;
	EmailTokenTypeEnum type;
}
