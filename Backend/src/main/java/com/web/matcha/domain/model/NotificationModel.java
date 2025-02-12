package com.web.matcha.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.web.matcha.domain.enums.TypeNotificationEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class NotificationModel {
	Integer id;

	int userId;

	TypeNotificationEnum type;

	String username;

	Boolean isRead;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	Timestamp createdAt;
}
