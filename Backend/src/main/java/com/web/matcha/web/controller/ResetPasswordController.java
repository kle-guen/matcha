package com.web.matcha.web.controller;

import com.web.matcha.domain.enums.EmailTokenTypeEnum;
import com.web.matcha.service.EmailService;
import com.web.matcha.service.UserService;
import lombok.RequiredArgsConstructor;

import static spark.Spark.*;

@RequiredArgsConstructor
public class ResetPasswordController extends AbstractController {

    private final EmailService emailService;
    private final UserService userService;

    @Override
    public void registerRoutes() {
        post("/forgot-password/request", this::forgotPassword);
        post("/forgot-password/reset", this::resetPassword);
    }

    private Object forgotPassword(spark.Request request, spark.Response response) throws Exception {
        final String email = request.queryParams("email");
        if (email == null || email.isEmpty()) {
            response.status(400);
            return "Email is required";
        }

        emailService.sendEmail(email, EmailTokenTypeEnum.RESET_PASSWORD);
        response.status(200);
        return "Password reset email sent";
    }

    private Object resetPassword(spark.Request request, spark.Response response) throws Exception {
        final String token = request.queryParams("token");
        final String password = request.queryParams("password");

        if (password == null || password.length() < 8) {
            response.status(400);
            return "Password must be at least 8 characters long";
        }

        try {
            final int userId = emailService.getUserIdByToken(token);
            emailService.deleteToken(token);
            userService.resetPassword(userId, password);
            response.status(200);
            return "Password reset successfully";
        } catch (Exception e) {
            response.status(400);
            return "Error resetting password: " + e.getMessage();
        }
    }
}