package com.web.matcha.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class LikeModel {
	int likerId;
	int likedId;
	Timestamp createdAt;
	boolean disliked;
}
