package com.web.matcha.service;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.mapper.UserMapper;
import com.web.matcha.web.dto.UserDto;
import io.javalin.http.BadRequestResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserService {

	final private UserDAO userDAO;

	final private UserMapper userMapper;

	public UserModel getUserById(int id) {
		return userDAO.getUserById(id)
				.orElseThrow(() -> new BadRequestResponse("User not found"));
	}

	public void addUser(UserDto userDto) {
		userDAO.insertUser(userMapper.toModel(userDto))
				.orElseThrow(() -> new BadRequestResponse("Error while adding user"));
	}

	public void verifyUserEmail(int userId) {
		userDAO.verifyUserEmail(userId);
	}
}