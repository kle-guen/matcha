package com.web.matcha.web.controller;

import com.web.matcha.service.InterestsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import static spark.Spark.*;

@RequiredArgsConstructor
public class InterestsController extends AbstractController {

    private final InterestsService interestsService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void registerRoutes() {
        get("/interests", this::getInterests);
    }

    private Object getInterests(spark.Request request, spark.Response response) throws Exception {
        response.status(202);
        response.type("application/json");
        return objectMapper.writeValueAsString(interestsService.getInterests());
    }
}