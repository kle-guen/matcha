package com.web.matcha.domain.model;

import com.web.matcha.domain.enums.TypeNotificationEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class NotificationModel {
	Integer id;

	int userId;

	TypeNotificationEnum type;

	String content;

	Boolean isRead;

	Timestamp createdAt;
}
