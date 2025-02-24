package com.web.matcha.service;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.mapper.UserMapper;
import com.web.matcha.web.dto.UserDto;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserService {

    private final UserDAO userDAO;
    private final UserMapper userMapper;

    public UserModel getUserById(int id) throws Exception {
        return userDAO.getUserById(id)
                .orElseThrow(() -> new Exception("User not found for ID: " + id));
    }

    public void addUser(UserDto userDto) throws Exception {
        userDAO.insertUser(userMapper.toModel(userDto))
                .orElseThrow(() -> new Exception("Error while adding user"));
    }

    public void updateUser(UserDto userDto) throws Exception {
        userDAO.updateUser(userMapper.toModel(userDto));
    }

    public void verifyUserEmail(int userId) throws Exception {
        userDAO.verifyUserEmail(userId);
    }

    public void resetPassword(int userId, String password) throws Exception {
        userDAO.resetPassword(userId, password);
    }
}