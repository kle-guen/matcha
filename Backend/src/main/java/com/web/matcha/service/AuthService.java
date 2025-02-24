package com.web.matcha.service;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.domain.utils.JwtUtils;
import org.mindrot.jbcrypt.BCrypt;

import javax.naming.AuthenticationException;
import java.util.Optional;

public class AuthService {

    private final UserDAO userDAO;

    public AuthService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public String authenticate(String email, String password) throws AuthenticationException {
        Optional<UserModel> optionalUser = userDAO.getUserByEmail(email, password);
        if (!optionalUser.isPresent()) {
            throw new AuthenticationException("Unknown email.");
        }

        UserModel user = optionalUser.get();
        if (!BCrypt.checkpw(password, user.getPassword())) {
            throw new AuthenticationException("Invalid password");
        }
        if (!user.getVerified()) {
            throw new AuthenticationException("Email not verified");
        }

        final int userId = user.getId();
        return JwtUtils.generateToken(userId);
    }
}