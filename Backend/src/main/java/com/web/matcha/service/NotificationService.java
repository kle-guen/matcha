package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.config.WebSocketConfig;
import com.web.matcha.domain.dao.NotificationDAO;
import com.web.matcha.domain.enums.TypeNotificationEnum;
import com.web.matcha.mapper.NotificationMapper;
import com.web.matcha.web.dto.NotificationDto;
import io.javalin.http.NotFoundResponse;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
public class NotificationService {

	private final NotificationDAO notificationDAO;

	private final NotificationMapper notificationMapper;

	public List<NotificationDto> getNotificationsByUserId() {
		return notificationDAO.getNotificationsByUserId(UserHolder.getUserId())
				.orElseThrow(() -> new NotFoundResponse("Notifications not found"))
				.stream()
				.map(notificationMapper::toDto)
				.toList();
	}

	public void createNotification(Integer userId, NotificationDto notificationDto) {
		notificationDAO.createNotification(userId, notificationMapper.toModel(notificationDto));
	}

	public void sendNotificationToUser(int memberId, TypeNotificationEnum type, String username) {
		NotificationDto notification = new NotificationDto(
				type,
				LocalDateTime.now(),
				username,
				false
		);
		WebSocketConfig.sendNotificationToUser(memberId, notification);
		createNotification(memberId, notification);
	}
}
