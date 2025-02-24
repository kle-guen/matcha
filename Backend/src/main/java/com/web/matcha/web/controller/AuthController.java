package com.web.matcha.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.matcha.service.AuthService;
import com.web.matcha.web.dto.UserDto;
import lombok.RequiredArgsConstructor;

import java.util.Collections;

import static spark.Spark.*;

@RequiredArgsConstructor
public class AuthController extends AbstractController {

    private final AuthService authService;
    private final ObjectMapper objectMapper = new ObjectMapper(); // Use Jackson ObjectMapper

    @Override
    public void registerRoutes() {
        post("/auth/token", (request, response) -> {
            UserDto userDto = objectMapper.readValue(request.body(), UserDto.class);
            String email = userDto.getEmail();
            String password = userDto.getPassword();

            if (email == null || password == null) {
                response.status(400);
                return objectMapper.writeValueAsString(Collections.singletonMap("error", "Invalid email or password"));
            }

            try {
                String token = authService.authenticate(email, password);
                response.status(202);
                response.type("application/json");
                return objectMapper.writeValueAsString(Collections.singletonMap("token", token));
            } catch (Exception e) {
                response.status(401);
                return objectMapper.writeValueAsString(Collections.singletonMap("error", e.getMessage()));
            }
        });
    }
}