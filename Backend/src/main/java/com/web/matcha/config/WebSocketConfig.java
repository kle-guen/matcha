package com.web.matcha.config;

import io.javalin.Javalin;
import io.javalin.websocket.WsConfig;
import io.javalin.websocket.WsContext;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class WebSocketConfig {

	private static final Map<Integer, WsContext> clientConnections = new ConcurrentHashMap<>();

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

	void onConnect(final WsContext ctx) {
		//TODO: verifier le token JWT

		final Integer clientId = 1; //TODO: get client ID from UserHolder
		if (clientId == null) {
			ctx.session.close(1008, "ID client manquant");
			return;
		}

		clientConnections.put(clientId, ctx);
		log.info("Client connecté : ID=" + clientId);
		ctx.send("Connexion WebSocket établie pour le client : " + clientId);
	}

	void onMessage(final WsContext ctx) {
		String clientId = getClientId(ctx);
		if (clientId != null) {
			log.info("Message reçu de " + clientId + " : " + ctx.message());
		} else {
			log.info("Message reçu d'un client inconnu : " + ctx.se());
		}
	}

	void onClose(final WsContext ctx) {
		final Integer clientId = 1;
		if (clientId != null) {
			clientConnections.remove(clientId);
			log.info("Client déconnecté : ID=" + clientId);
		}
	}

	void onError(final WsContext ctx) {
		log.error("Erreur WebSocket pour " + ctx.getSessionId() + " : " + ctx.error());
	}
}
