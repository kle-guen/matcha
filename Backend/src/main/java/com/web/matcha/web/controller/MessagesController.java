package com.web.matcha.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.matcha.service.MessageService;
import com.web.matcha.web.dto.SendMessageDto;
import lombok.RequiredArgsConstructor;

import static spark.Spark.*;

@RequiredArgsConstructor
public class MessagesController extends AbstractController {

    private final MessageService messageService;
    private final ObjectMapper objectMapper = new ObjectMapper(); // Use Jackson ObjectMapper

    @Override
    public void registerRoutes() {
        get("/messages", this::getMessages);
        post("/messages", this::sendMessage);
        put("/messages/read/:id", this::readMessage);
    }

    private Object sendMessage(spark.Request request, spark.Response response) throws Exception {
        SendMessageDto sendMessageDto = objectMapper.readValue(request.body(), SendMessageDto.class);
        messageService.createMessage(sendMessageDto);
        response.status(201);
        return "Message sent successfully";
    }

    private Object getMessages(spark.Request request, spark.Response response) throws Exception {
        response.type("application/json");
        return objectMapper.writeValueAsString(messageService.getMessages());
    }

    private Object readMessage(spark.Request request, spark.Response response) throws Exception {
        final int senderId = Integer.parseInt(request.params(":id"));
        messageService.readMessages(senderId);
        response.status(200);
        return "Messages marked as read";
    }
}