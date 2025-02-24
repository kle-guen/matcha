package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.config.WebSocketHandler;
import com.web.matcha.domain.dao.NotificationDAO;
import com.web.matcha.domain.enums.TypeNotificationEnum;
import com.web.matcha.mapper.NotificationMapper;
import com.web.matcha.web.dto.NotificationDto;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class NotificationService {

    private final NotificationDAO notificationDAO;
    private final NotificationMapper notificationMapper;
    private final BlockService blockService;

    public List<NotificationDto> getNotificationsByUserId() throws Exception {
        return notificationDAO.getNotificationsByUserId(UserHolder.getUserId())
                .orElseThrow(() -> new Exception("Notifications not found"))
                .stream()
                .map(notificationMapper::toDto)
                .toList();
    }

    private void createNotification(Integer userId, NotificationDto notificationDto) {
        notificationDAO.createNotification(userId, notificationMapper.toModel(notificationDto));
    }

    public void sendNotificationToUser(int memberId, TypeNotificationEnum type, String username) throws Exception {
        final NotificationDto notification = new NotificationDto(
                UserHolder.getUserId(),
                type,
                LocalDateTime.now(),
                username,
                false
        );
        WebSocketHandler.sendNotificationToUser(memberId, notification);
        createNotification(memberId, notification);
    }
}