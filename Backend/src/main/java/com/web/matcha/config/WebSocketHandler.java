package com.web.matcha.config;

import com.web.matcha.domain.utils.JwtUtils;
import com.web.matcha.web.dto.MessageDto;
import com.web.matcha.web.dto.NotificationDto;
import com.web.matcha.web.ws.dto.WsDto;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@WebSocket
public class WebSocketHandler {

	private static final Map<String, Session> clientConnections = new ConcurrentHashMap<>();
	private static final Map<Integer, List<String>> sessionToUser = new ConcurrentHashMap<>();

	@OnWebSocketConnect
	public void onConnect(Session session) {
		String token = session.getUpgradeRequest().getParameterMap().get("token").get(0);
		Integer clientId = JwtUtils.validateTokenAndGetUserId(token);
		if (clientId == null) {
			try {
				session.close(1008, "ID client manquant");
			} catch (Exception e) {
				log.error("Error closing session", e);
			}
			return;
		}

		Optional.ofNullable(sessionToUser.get(clientId))
				.ifPresentOrElse(sessionsUser -> sessionsUser.add(session.getRemoteAddress().toString()), //if
						() -> {
							sessionToUser.forEach((k, v) -> {  //else
								v.forEach(sessionId -> {
									Optional.ofNullable(clientConnections.get(sessionId))
											.ifPresent(c -> sendMessage(c, WsDto.builder()
													.type("CONNECTION")
													.data(clientId)
													.build()));
								});
							});
							sessionToUser.put(clientId, List.of(session.getRemoteAddress().toString()));
						});
		clientConnections.put(session.getRemoteAddress().toString(), session);
		log.info("Client {} a ouvert une session WebSocket", clientId);
	}

	@OnWebSocketMessage
	public void onMessage(Session session, String message) {
		log.info("Received message: {}", message);
		// Handle incoming messages here
	}

	@OnWebSocketClose
	public void onClose(Session session, int statusCode, String reason) {
		clientConnections.remove(session.getRemoteAddress().toString());
		log.info("Closed: {} with statusCode: {} and reason: {}", session.getRemoteAddress(), statusCode, reason);
	}

	@OnWebSocketError
	public void onError(Session session, Throwable error) {
		log.error("Error: ", error);
	}

	private static void sendMessage(Session session, WsDto<?> message) {
		try {
			session.getRemote().sendString(message.toString());
		} catch (Exception e) {
			log.error("Error sending message", e);
		}
	}

	public static void sendNotificationToUser(Integer userId, NotificationDto notification) {
		Optional.ofNullable(sessionToUser.get(userId))
				.ifPresent(sessions -> sessions.forEach(sessionId -> {
					Optional.ofNullable(clientConnections.get(sessionId))
							.ifPresent(ctx -> sendMessage(ctx, WsDto.builder()
									.data(notification)
									.type("NOTIFICATION")
									.build()));
				}));
	}

	public static void sendMessageToUser(Integer userId, MessageDto message) {
		Optional.ofNullable(sessionToUser.get(userId))
				.ifPresent(sessions -> sessions.forEach(sessionId -> {
					Optional.ofNullable(clientConnections.get(sessionId))
							.ifPresent(ctx -> sendMessage(ctx, WsDto.builder()
									.data(message)
									.type("CHAT")
									.build()));
				}));
		message.setRead(true);
		Optional.ofNullable(sessionToUser.get(message.senderId))
				.ifPresent(sessions -> sessions.forEach(sessionId -> {
					Optional.ofNullable(clientConnections.get(sessionId))
							.ifPresent(ctx -> sendMessage(ctx, WsDto.builder()
									.data(message)
									.type("CHAT")
									.build()));
				}));
	}
}