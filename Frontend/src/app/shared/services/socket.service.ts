import { inject, Injectable } from '@angular/core';
import { AuthService } from "./auth-service";
import { SocketDto } from "../../data/dto/socket/socket.dto";
import { NotificationDto } from "../../data/dto/socket/notification.dto";
import { TypeSocketEnum } from "../enums/type-socket.enum";
import { NotificationsService } from "./notifications-service";
import { ChatService } from "./chat-service";
import { ChatDto } from "../../data/dto/socket/chat.dto";
import { ConnectionService } from "./connection.service";

@Injectable({
	providedIn: 'root',
})
export class SocketService {
	private socket!: WebSocket;
	private isManuallyClosed = false;
	private readonly notificationsService = inject(NotificationsService);
	private readonly authService = inject(AuthService);
	private readonly chatService = inject(ChatService);
	private readonly connectionService = inject(ConnectionService);
	private interval?: ReturnType<typeof setInterval>;

	/**
	 * Démarre la connexion WebSocket
	 */
	startWebSocketConnection() {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			console.log('WebSocket déjà connecté, aucune nouvelle connexion');
			return;
		}

		this.isManuallyClosed = false;
		const token = this.authService.getToken();
		this.socket = new WebSocket(`ws://backend_container:7000/ws?token=${token}`);

		this.socket.onopen = () => {
			console.log('✅ WebSocket connecté');
			clearInterval(this.interval!);
			this.interval = setInterval(() => {
				if (this.socket.readyState === WebSocket.OPEN) {
					this.socket.send('ping');
				}
			}, 20000);
		};

		this.socket.onmessage = (event) => {
			console.log('📩 Message reçu:', event);
			this.handleIncomingMessage(JSON.parse(event.data) as SocketDto);
		};

		this.socket.onclose = () => {
			console.log('❌ WebSocket fermé');

			clearInterval(this.interval!);

			// Vérifie si la fermeture est manuelle ou non
			if (!this.isManuallyClosed) {
				console.log('🔄 Tentative de reconnexion...');
				setTimeout(() => this.startWebSocketConnection(), 5000);
			} else {
				console.log('🛑 Fermeture manuelle, pas de reconnexion');
			}
		};
	}

	/**
	 * Ferme la connexion WebSocket manuellement
	 */
	public closeWebSocketConnection() {
		if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
			console.log('Aucune connexion WebSocket active à fermer');
			return;
		}

		this.isManuallyClosed = true;
		this.socket.close();
		console.log('🔌 WebSocket fermé manuellement');
	}

	/**
	 * Gère les messages entrants
	 * @param msg Message reçu
	 */
	private handleIncomingMessage(msg: SocketDto) {
		console.log('📨 Nouveau message:', msg);

		switch (msg.type) {
			case TypeSocketEnum.NOTIFICATION:
				this.notificationsService.addNotification(msg.data as NotificationDto);
				break;
			case TypeSocketEnum.CHAT:
				this.chatService.receiveMessage(msg.data as ChatDto);
				break;
			case TypeSocketEnum.PONG:
				console.log('🏓 Pong reçu');
				break;
			case TypeSocketEnum.CONNECTION:
				this.connectionService.addConnectedUser(msg.data as number);
				break;
			case TypeSocketEnum.DISCONNECTION:
				this.connectionService.removeConnectedUser(msg.data as number);
				break;
			default:
				console.error('⚠️ Type de message inconnu', msg);
				break;
		}
	}
}