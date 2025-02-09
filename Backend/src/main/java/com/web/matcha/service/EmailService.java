package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.EmailTokenDAO;
import com.web.matcha.domain.model.EmailTokenModel;
import lombok.RequiredArgsConstructor;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;

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
	 * @param receiving_email
	 */
	public void sendVerificationEmail(String receiving_email) {
		try {
			final Integer userId = UserHolder.getUserId();
			final String emailToken = addEmailToken(userId);

			Email email = new SimpleEmail();
			email.setHostName("smtp.mailgun.org");
			email.setSmtpPort(587);
			//Todo: Get username and password from environment variables
			email.setAuthenticator(new DefaultAuthenticator("postmaster@sandbox9d270eb7a138450c9e31d299420fb76c.mailgun.org", "dc7fc93abc064e041916c4b74413709e-667818f5-5ffb519b"));
			email.setFrom("noreplymatcha42angouleme@gmail.com");
			email.setSubject("Matcha - Email Verification");
			email.setMsg(("Please click the following link to verify your email: http://localhost:4200/verify-email?token=" + emailToken));
			email.addTo("noreplymatcha42angouleme@gmail.com");
			email.send();

		} catch (Exception e) {
			throw new RuntimeException("Error sending email: " + e.getMessage(), e);
		}
	}
}
