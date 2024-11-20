package com.web.matcha.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class LikeModel {
	int likerId;
	int likedId;
	Timestamp createdAt;
}
