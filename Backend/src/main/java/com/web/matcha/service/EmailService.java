package com.web.matcha.service;

import com.web.matcha.config.Env;
import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.EmailTokenDAO;
import com.web.matcha.domain.model.EmailTokenModel;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;

import java.util.Objects;
import java.util.UUID;


@RequiredArgsConstructor
public class EmailService {

	/**
	 * The email token DAO
	 */
	final private EmailTokenDAO emailTokenDAO;

	/**
	 * Add the email token
	 *
	 * @param userId
	 */
	public String addEmailToken(Integer userId) {
		final String token = UUID.randomUUID().toString();
		final EmailTokenModel emailToken = new EmailTokenModel(userId, token);
		emailTokenDAO.insertEmailToken(emailToken);
		return emailToken.getToken();
	}

	/**
	 * Get the user id by token
	 *
	 * @param token
	 */
	public int getUserIdByToken(String token) {
		return emailTokenDAO.getUserIdByToken(token)
				.orElseThrow(() -> new RuntimeException("Token not Found"));
	}

	/**
	 * Delete the token
	 *
	 * @param token
	 */
	public void deleteToken(String token) {
		emailTokenDAO.deleteToken(token);
	}

	/**
	 * Send the verification email
	 *
	 * @param receivingEmail
	 */
	public void sendVerificationEmail(String receivingEmail) {
		Dotenv env = Env.getDotenv();

		try {
			final Integer userId = UserHolder.getUserId();
			final String emailToken = addEmailToken(userId);

			Email email = new SimpleEmail();
			email.setHostName(env.get("SMTP_HOSTNAME"));
			email.setSmtpPort(Integer.parseInt(Objects.requireNonNull(env.get("SMTP_PORT"))));
			email.setAuthenticator(new DefaultAuthenticator(env.get("SMTP_USERNAME"), env.get("SMTP_PASSWORD")));
			email.setFrom("noreplymatcha42angouleme@gmail.com");
			email.setSubject("Matcha - Email Verification");
			email.setMsg("Please click the following link to verify your email: " + env.get("FRONT_URL") + "/verify-email?token=" + emailToken);
			email.addTo(receivingEmail);
			email.send();

		} catch (Exception e) {
			throw new RuntimeException("Error sending email: " + e.getMessage(), e);
		}
	}
}
