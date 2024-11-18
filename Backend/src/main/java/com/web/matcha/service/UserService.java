package com.web.matcha.service;

import com.web.matcha.domain.model.User;

import java.util.ArrayList;
import java.util.List;


public class UserService {

	private List<User> users = new ArrayList<>();

	public UserService() {
		// Données fictives pour commencer
		users.add(new User(1, "Alice", "alice@example.com"));
		users.add(new User(2, "Bob", "bob@example.com"));
	}

	public List<User> getAllUsers() {
		return users;
	}

	public User getUserById(int id) {
		return users.stream().filter(user -> user.getId() == id).findFirst().orElse(null);
	}

	public void addUser(User user) {
		users.add(user);
	}
}