package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.config.WebSocketHandler;
import com.web.matcha.domain.dao.MessageDAO;
import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.enums.TypeNotificationEnum;
import com.web.matcha.domain.model.MessageModel;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.mapper.MessageMapper;
import com.web.matcha.web.dto.MessageDto;
import com.web.matcha.web.dto.SendMessageDto;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
public class MessageService {

    private final UserDAO userDAO;
    private final MessageDAO messageDAO;
    private final BlockService blockService;
    private final NotificationService notificationService;
    private final MessageMapper messageMapper;

    public void createMessage(final SendMessageDto sendMessageDto) throws Exception {
        UserModel currentUser = userDAO.getUserById(UserHolder.getUserId())
                .orElseThrow(() -> new Exception("User not found"));

        if (blockService.isBlockedOrBlocker(sendMessageDto.receiverId)) {
            throw new Exception("You can't send a message to this user");
        }
        final MessageModel message = MessageModel.builder()
                .senderId(UserHolder.getUserId())
                .receiverId(sendMessageDto.receiverId)
                .content(sendMessageDto.content)
                .createdAt(Timestamp.from(Instant.now()))
                .isRead(false)
                .build();
        messageDAO.createMessage(message);
        notificationService.sendNotificationToUser(sendMessageDto.receiverId, TypeNotificationEnum.MESSAGE, currentUser.getUsername());
        WebSocketHandler.sendMessageToUser(sendMessageDto.receiverId, messageMapper.toMessageDto(message));
    }

    public List<MessageDto> getMessages() {
        return messageDAO.getMessagesById(UserHolder.getUserId()).stream()
                .map(messageMapper::toMessageDto)
                .peek(messageDto -> messageDto.setRead(messageDto.isRead() || Objects.equals(messageDto.getSenderId(), UserHolder.getUserId())))
                .filter(messageDto -> !blockService.isBlockedOrBlocker(messageDto.getSenderId()) || !blockService.isBlockedOrBlocker(messageDto.getReceiverId()))
                .toList();
    }

    public void readMessages(int senderId) {
        messageDAO.readMessages(UserHolder.getUserId(), senderId);
    }
}