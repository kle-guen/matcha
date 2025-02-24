package com.web.matcha.service;


import com.web.matcha.config.Env;
import com.web.matcha.domain.dao.EmailTokenDAO;
import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.enums.EmailTokenTypeEnum;
import com.web.matcha.domain.model.EmailTokenModel;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private final EmailTokenDAO emailTokenDAO;
    private final UserDAO userDAO;

    public String addEmailToken(Integer userId, EmailTokenTypeEnum type) {
        final String token = UUID.randomUUID().toString();
        final EmailTokenModel emailToken = new EmailTokenModel(userId, token, type);
        emailTokenDAO.insertEmailToken(emailToken);
        return emailToken.getToken();
    }

    public int getUserIdByToken(String token) throws Exception {
        return emailTokenDAO.getUserIdByToken(token)
                .orElseThrow(() -> new Exception("Token not found"));
    }

    public int getUserIdByEmail(String email) throws Exception {
        return userDAO.getUserIdByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));
    }

    public void deleteToken(String token) {
        emailTokenDAO.deleteToken(token);
    }

    public void sendEmail(String receivingEmail, EmailTokenTypeEnum type) throws Exception {
        Dotenv env = Env.getDotenv();

        try {
            final Integer userId = getUserIdByEmail(receivingEmail);
            final String emailToken = addEmailToken(userId, type);

            Email email = new SimpleEmail();
            email.setHostName(env.get("SMTP_HOSTNAME"));
            email.setSmtpPort(Integer.parseInt(Objects.requireNonNull(env.get("SMTP_PORT"))));
            email.setAuthenticator(new DefaultAuthenticator(env.get("SMTP_USERNAME"), env.get("SMTP_PASSWORD")));
            email.setFrom("noreplymatcha42angouleme@gmail.com");

            if (type == EmailTokenTypeEnum.VERIFY_EMAIL) {
                email.setSubject("Matcha - Email Verification");
                email.setMsg("Please click the following link to verify your email: " + env.get("FRONT_URL") + "/verify-email?token=" + emailToken);
            } else {
                email.setSubject("Matcha - Reset Password");
                email.setMsg("Please click the following link to reset your password: " + env.get("FRONT_URL") + "/forgot-password?token=" + emailToken);
            }

            email.addTo(receivingEmail);
            email.send();

        } catch (Exception e) {
            log.error("Error sending email", e);
            throw new Exception("Error sending email: " + e.getMessage());
        }
    }
}