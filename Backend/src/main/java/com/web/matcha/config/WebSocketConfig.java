package com.web.matcha.config;

import com.web.matcha.domain.utils.JwtUtils;
import io.javalin.Javalin;
import io.javalin.websocket.WsCloseContext;
import io.javalin.websocket.WsConfig;
import io.javalin.websocket.WsConnectContext;
import io.javalin.websocket.WsContext;
import io.javalin.websocket.WsErrorContext;
import io.javalin.websocket.WsMessageContext;
import lombok.extern.slf4j.Slf4j;

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
				.ifPresentOrElse(sessionsUser -> sessionsUser.add(ctx.sessionId()),
						() -> {
							sessionToUser.put(clientId, List.of(ctx.sessionId()));
							//TODO notifier les users l'user clientId s'est connecté
						});
		clientConnections.put(ctx.sessionId(), ctx);
		log.info("Client {} a ouvert une session WebSocket", clientId);
		ctx.send("Connexion WebSocket établie pour le client : " + clientId);
	}

	void onMessage(final WsMessageContext ctx) {
		Integer clientId = sessionToUser.entrySet().stream()
				.filter(e -> e.getValue().contains(ctx.sessionId()))
				.map(Map.Entry::getKey)
				.findFirst()
				.orElse(null);
		if (clientId != null) {
			log.info("Message reçu de {} : {}", clientId, ctx.message());
		} else {
			log.info("Message reçu d'un client inconnu : {}", ctx.sessionId());
		}
	}

	void onClose(final WsCloseContext ctx) {
		clientConnections.remove(ctx.sessionId());
		sessionToUser.forEach((k, v) -> {
			if (v.remove(ctx.sessionId()) && v.isEmpty()) {
				//TODO notifier les users l'user k s'est déconnecté
				sessionToUser.remove(k);
				log.info("Client déconnecté : ID={}", k);
			}
		});
	}

	void onError(final WsErrorContext ctx) {
//		log.error("Erreur WebSocket pour " + ctx.getSessionId() + " : " + ctx.error());
	}
}
