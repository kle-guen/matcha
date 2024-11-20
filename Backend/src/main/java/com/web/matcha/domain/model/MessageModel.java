package com.web.matcha.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class MessageModel {
	Integer id;
	int senderId;
	int receiverId;
	String content;
	Timestamp createdAt;
}
