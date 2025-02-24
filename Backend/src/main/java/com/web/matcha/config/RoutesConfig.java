package com.web.matcha.config;

import com.web.matcha.domain.dao.BlockDAO;
import com.web.matcha.domain.dao.EmailTokenDAO;
import com.web.matcha.domain.dao.InterestDAO;
import com.web.matcha.domain.dao.LikeDAO;
import com.web.matcha.domain.dao.MessageDAO;
import com.web.matcha.domain.dao.NotificationDAO;
import com.web.matcha.domain.dao.PicturesDAO;
import com.web.matcha.domain.dao.ProfileDAO;
import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.mapper.InterestMapper;
import com.web.matcha.mapper.MemberMapper;
import com.web.matcha.mapper.MessageMapper;
import com.web.matcha.mapper.NotificationMapper;
import com.web.matcha.mapper.ProfileMapper;
import com.web.matcha.mapper.UserMapper;
import com.web.matcha.service.AuthService;
import com.web.matcha.service.BlockService;
import com.web.matcha.service.EmailService;
import com.web.matcha.service.InterestsService;
import com.web.matcha.service.MemberService;
import com.web.matcha.service.MessageService;
import com.web.matcha.service.NotificationService;
import com.web.matcha.service.PicturesService;
import com.web.matcha.service.ProfileService;
import com.web.matcha.service.UserService;
import com.web.matcha.web.controller.AbstractController;
import com.web.matcha.web.controller.AuthController;
import com.web.matcha.web.controller.EmailTokenController;
import com.web.matcha.web.controller.ImageController;
import com.web.matcha.web.controller.InterestsController;
import com.web.matcha.web.controller.MemberController;
import com.web.matcha.web.controller.MessagesController;
import com.web.matcha.web.controller.NotificationController;
import com.web.matcha.web.controller.ProfileController;
import com.web.matcha.web.controller.ResetPasswordController;
import com.web.matcha.web.controller.UserController;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import spark.Spark;

import java.util.List;

import static spark.Spark.*;

public class RoutesConfig {

    private RoutesConfig() {
    }

    public static void configure() {



        // DAOs
        final ProfileDAO profileDAO = new ProfileDAO();
        final UserDAO userDAO = new UserDAO();
        final InterestDAO interestDAO = new InterestDAO();
        final EmailTokenDAO emailTokenDAO = new EmailTokenDAO();
        final BlockDAO blockDAO = new BlockDAO();
        final LikeDAO likeDAO = new LikeDAO();
        final PicturesDAO picturesDAO = new PicturesDAO();
        final NotificationDAO notificationDAO = new NotificationDAO();
        final MessageDAO messageDAO = new MessageDAO();

        // Mappers
        final UserMapper userMapper = Mappers.getMapper(UserMapper.class);
        final MemberMapper memberMapper = Mappers.getMapper(MemberMapper.class);
        final InterestMapper interestMapper = Mappers.getMapper(InterestMapper.class);
        final ProfileMapper profileMapper = Mappers.getMapper(ProfileMapper.class);
        final NotificationMapper notificationMapper = Mappers.getMapper(NotificationMapper.class);
        final MessageMapper messageMapper = Mappers.getMapper(MessageMapper.class);

        // Services
        final UserService userService = new UserService(userDAO, userMapper);
        final BlockService blockService = new BlockService(blockDAO);
        final NotificationService notificationService = new NotificationService(notificationDAO, notificationMapper, blockService);
        final MemberService memberService = new MemberService(memberMapper, userDAO, profileDAO, likeDAO, picturesDAO, notificationService, blockService);
        final InterestsService interestsService = new InterestsService(interestDAO, interestMapper);
        final AuthService authService = new AuthService(userDAO);
        final EmailService emailService = new EmailService(emailTokenDAO, userDAO);
        final ProfileService profileService = new ProfileService(profileDAO, profileMapper, interestDAO);
        final PicturesService picturesService = new PicturesService(picturesDAO);
        final MessageService messageService = new MessageService(userDAO, messageDAO, blockService, notificationService, messageMapper);

        // Controllers
        final List<AbstractController> controllers = List.of(
                new UserController(userService, emailService, picturesService),
                new MemberController(memberService, blockService),
                new InterestsController(interestsService),
                new EmailTokenController(emailService, userService),
                new AuthController(authService),
                new ProfileController(profileService, picturesService),
                new ImageController(),
                new NotificationController(notificationService),
                new MessagesController(messageService),
                new ResetPasswordController(emailService, userService));

        controllers.forEach(AbstractController::registerRoutes);
        // WebSocket configuration
        //webSocket("/ws", WebSocketHandler.class);
        Spark.init(); // Initialize the Spark server
    }
}