package com.web.matcha.service;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.mapper.UserMapper;
import com.web.matcha.web.dto.UserDto;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserService {

	final private UserDAO userDAO;

	final private UserMapper userMapper;

	public UserModel getUserById(Long id) {
		return userDAO.getUserById(id);
	}

	public void addUser(UserDto userDto) {
		userDAO.insertUser(userMapper.toModel(userDto));
	}
}