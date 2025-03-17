package com.web.matcha.web.controller;

import com.web.matcha.service.MessageService;
import com.web.matcha.web.dto.SendMessageDto;
import io.javalin.Javalin;
import io.javalin.http.Context;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MessagesController extends AbstractController {

	private final MessageService messageService;

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/messages", this::getMessages);
		app.post("/messages", this::sendMessage);
		app.put("/messages/read/{id}", this::readMessage);
	}

	private void sendMessage(Context ctx) {
		final SendMessageDto sendMessageDto = ctx.bodyAsClass(SendMessageDto.class);
		messageService.createMessage(sendMessageDto);
	}

	private void getMessages(Context ctx) {
		ctx.json(messageService.getMessages());
	}

	private void readMessage(Context ctx) {
		final int senderId = Integer.parseInt(ctx.pathParam("id"));
		this.messageService.readMessages(senderId);
	}
}
