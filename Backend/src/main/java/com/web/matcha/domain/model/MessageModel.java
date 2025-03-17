package com.web.matcha.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class MessageModel {
	Integer id;
	int senderId;
	int receiverId;
	String content;
	boolean isRead;
	Timestamp createdAt;
}
