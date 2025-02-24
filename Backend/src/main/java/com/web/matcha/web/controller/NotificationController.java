package com.web.matcha.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.matcha.service.NotificationService;
import lombok.RequiredArgsConstructor;

import static spark.Spark.*;

@RequiredArgsConstructor
public class NotificationController extends AbstractController {

    private final NotificationService notificationService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void registerRoutes() {
        get("/notifications", this::getNotificationsByUserId);
    }

    private Object getNotificationsByUserId(spark.Request request, spark.Response response) throws Exception {
        response.status(202);
        response.type("application/json");
        return objectMapper.writeValueAsString(notificationService.getNotificationsByUserId());
    }
}