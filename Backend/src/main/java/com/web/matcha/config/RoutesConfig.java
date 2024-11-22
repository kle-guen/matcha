package com.web.matcha.config;

import com.web.matcha.domain.dao.EmailTokenDAO;
import com.web.matcha.domain.dao.InterestDAO;
import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.InterestModel;
import com.web.matcha.mapper.InterestMapper;
import com.web.matcha.mapper.UserMapper;
import com.web.matcha.service.AuthService;
import com.web.matcha.service.EmailService;
import com.web.matcha.service.InterestsService;
import com.web.matcha.service.UserService;
import com.web.matcha.web.controller.AbstractController;
import com.web.matcha.web.controller.AuthController;
import com.web.matcha.web.controller.EmailTokenController;
import com.web.matcha.web.controller.InterestsController;
import com.web.matcha.web.dto.InterestDto;
import io.javalin.Javalin;
import com.web.matcha.web.controller.UserController;
import org.mapstruct.factory.Mappers;

import java.util.List;

public class RoutesConfig {

	public static void configure(final Javalin app) {
		// DAOs
		final UserDAO userDAO = new UserDAO();
		final InterestDAO interestDAO = new InterestDAO();
		final EmailTokenDAO emailTokenDAO = new EmailTokenDAO();

		// Mappers
		final UserMapper userMapper = Mappers.getMapper(UserMapper.class);
		final InterestMapper interestMapper = Mappers.getMapper(InterestMapper.class);

		// Services
		final UserService userService = new UserService(userDAO, userMapper);
		final InterestsService interestsService = new InterestsService(interestDAO, interestMapper);
		final AuthService authService = new AuthService(userDAO);
		final EmailService emailService = new EmailService(emailTokenDAO);

		// Controllers
		final List<AbstractController> controllers = List.of(
				new UserController(userService, emailService),
				new InterestsController(interestsService),
				new EmailTokenController(emailService, userService),
				new AuthController(authService));

		controllers.forEach(controller -> controller.registerRoutes(app));
	}
}
