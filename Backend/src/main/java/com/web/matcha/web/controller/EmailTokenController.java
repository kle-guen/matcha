package com.web.matcha.web.controller;

import com.web.matcha.service.EmailService;
import com.web.matcha.service.UserService;
import lombok.RequiredArgsConstructor;

import static spark.Spark.*;

@RequiredArgsConstructor
public class EmailTokenController extends AbstractController {

    private final EmailService emailService;
    private final UserService userService;

    @Override
    public void registerRoutes() {
        post("/verify-email", (request, response) -> {
            String token = request.queryParams("token");

            if (token == null || token.isEmpty()) {
                response.status(400);
                return "Token is required";
            }

            try {
                int userId = emailService.getUserIdByToken(token);
                userService.verifyUserEmail(userId);
                emailService.deleteToken(token);
                response.status(200);
                return "Email verified successfully";
            } catch (Exception e) {
                response.status(400);
                return "Error verifying email: " + e.getMessage();
            }
        });
    }
}