package com.web.matcha.config;

import com.web.matcha.domain.utils.JwtUtils;
import com.web.matcha.web.dto.MessageDto;
import com.web.matcha.web.dto.NotificationDto;
import com.web.matcha.web.ws.dto.WsDataConnection;
import com.web.matcha.web.ws.dto.WsDto;
import io.javalin.Javalin;
import io.javalin.websocket.WsCloseContext;
import io.javalin.websocket.WsConfig;
import io.javalin.websocket.WsConnectContext;
import io.javalin.websocket.WsContext;
import io.javalin.websocket.WsErrorContext;
import io.javalin.websocket.WsMessageContext;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class WebSocketConfig {

	private static final Map<String, WsContext> clientConnections = new ConcurrentHashMap<>();

	private static final Map<Integer, List<String>> sessionToUser = new ConcurrentHashMap<>();

	public void configure(Javalin app) {
		app.ws("/ws", this::test);
	}

	void test(final WsConfig ws) {
		ws.onConnect(this::onConnect);

		// Quand un client envoie un message
		ws.onMessage(this::onMessage);

		// Quand un client se déconnecte
		ws.onClose(this::onClose);

		// En cas d'erreur
		ws.onError(this::onError);
	}

	void onConnect(final WsConnectContext ctx) {
		final Integer clientId = JwtUtils.validateTokenAndGetUserId(ctx.queryParam("token"));
		if (clientId == null) {
				ctx.session.close(1008, "ID client manquant");
			return;
		}

		Optional.ofNullable(sessionToUser.get(clientId))
				.ifPresentOrElse(sessionsUser -> sessionsUser.add(ctx.sessionId()), //if
						() -> sessionToUser.put(clientId, new ArrayList<>(List.of(ctx.sessionId())))); //else
		clientConnections.put(ctx.sessionId(), ctx);
		log.info("Client {} a ouvert une session WebSocket", clientId);
	}

	void onMessage(final WsMessageContext ctx) {
		Integer clientId = sessionToUser.entrySet().stream()
				.filter(e -> e.getValue().contains(ctx.sessionId()))
				.map(Map.Entry::getKey)
				.findFirst()
				.orElse(null);
		if (clientId != null) {
			log.info("Ping reçu de {} : {}", clientId, ctx.message());
			ctx.send(WsDto.builder()
					.type("PONG")
					.data("Message reçu")
					.build());
		}
	}

	void onClose(final WsCloseContext ctx) {
		clientConnections.remove(ctx.sessionId());
		sessionToUser.forEach((k, v) -> {
			if (v.remove(ctx.sessionId()) && v.isEmpty()) {
				sessionToUser.remove(k);
				log.info("Client déconnecté : ID={}", k);
			}
		});
	}

	void onError(final WsErrorContext ctx) {
//		log.error("Erreur WebSocket pour " + ctx.getSessionId() + " : " + ctx.error());
	}

	public static void sendNotificationToUser(Integer userId, NotificationDto notification) {
		Optional.ofNullable(sessionToUser.get(userId))
				.ifPresent(sessions -> sessions.forEach(sessionId -> {
					Optional.ofNullable(clientConnections.get(sessionId))
							.ifPresent(ctx -> ctx.send(WsDto.builder()
									.data(notification)
									.type("NOTIFICATION")
									.build()));
				}));
	}

	public static void sendMessageToUser(Integer userId, MessageDto message) {
		Optional.ofNullable(sessionToUser.get(userId))
				.ifPresent(sessions -> sessions.forEach(sessionId -> {
					Optional.ofNullable(clientConnections.get(sessionId))
							.ifPresent(ctx -> ctx.send(WsDto.builder()
									.data(message)
									.type("CHAT")
									.build()));
				}));
		message.setRead(true);
		Optional.ofNullable(sessionToUser.get(message.senderId))
				.ifPresent(sessions -> sessions.forEach(sessionId -> {
					Optional.ofNullable(clientConnections.get(sessionId))
							.ifPresent(ctx -> ctx.send(WsDto.builder()
									.data(message)
									.type("CHAT")
									.build()));
				}));
	}
}
