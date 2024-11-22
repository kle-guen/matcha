package com.web.matcha.service;

import com.web.matcha.domain.dao.EmailTokenDAO;
import com.web.matcha.domain.model.EmailToken;
import lombok.RequiredArgsConstructor;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.sql.Timestamp;
import java.util.Properties;

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
	 * @param token
	 */
	public void addEmailToken(int userId, String token) {
		final EmailToken emailToken = new EmailToken(userId, token, new Timestamp(System.currentTimeMillis()));
		emailTokenDAO.insertEmailToken(emailToken);
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
	 * @param email
	 */
	public void sendVerificationEmail(String email) {
		try {
			// SMTP server configuration
			Properties props = new Properties();
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", "smtp.gmail.com");
			props.put("mail.smtp.port", "465");
			props.put("mail.smtp.ssl.enable", "true");

			Session session = Session.getInstance(props, new Authenticator() {
				@Override
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication("noreplymatcha42angouleme@gmail.com", "matcha42");
				}
			});

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("noreplymatcha42angouleme@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
			message.setSubject("test from matcha");
			message.setText("test mailing matcha");

			Transport.send(message);

		} catch (MessagingException e) {
			throw new RuntimeException("Error sending email: " + e.getMessage(), e);
		}
	}
}
