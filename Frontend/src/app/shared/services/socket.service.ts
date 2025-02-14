import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth-service";
import {SocketDto} from "../../data/dto/socket/socket.dto";
import {NotificationDto} from "../../data/dto/socket/notification.dto";
import {TypeSocketEnum} from "../enums/type-socket.enum";
import {NotificationsService} from "./notifications-service";
import {ChatService} from "./chat-service";
import {ChatDto} from "../../data/dto/socket/chat.dto";

@Injectable({
	providedIn: 'root',
})
export class SocketService {
	private socket!: WebSocket;

	private readonly notificationsService = inject(NotificationsService);
	private readonly authService: AuthService = inject(AuthService);
	private readonly chatService = inject(ChatService);
	interval?: NodeJS.Timeout;

	startWebSocketConnection() {
		const token = this.authService.getToken();
		this.socket = new WebSocket(`ws://backend_container:7000/ws?token=${token}`);

		this.socket.onopen = () => {
			console.log('WebSocket connecté');
			clearInterval(this.interval!);
			this.interval = setInterval(() => {
				if (this.socket.readyState === WebSocket.OPEN) {
					this.socket.send('ping');
				}
			}, 20000);
		};

		this.socket.onmessage = (event) => {
			console.log('Received message:', event);
			this.handleIncomingMessage(JSON.parse(event.data) as SocketDto);
		};

		this.socket.onclose = () => {
			console.log('WebSocket fermé, tentative de reconnexion...');
			clearInterval(this.interval!);
			setTimeout(() => this.startWebSocketConnection(), 5000);
		};
	}

	private handleIncomingMessage(msg: SocketDto) {
		console.log('Received message:', msg);

		switch (msg.type) {
			case TypeSocketEnum.NOTIFICATION:
				this.notificationsService.addNotification(msg.data as NotificationDto);
				break;
			case TypeSocketEnum.CHAT:
				this.chatService.receiveMessage(msg.data as ChatDto);
				break;
			case TypeSocketEnum.PONG:
				console.log('Received pong');
				break;
			default:
				console.error('Unknown message type', msg);
				break;
		}
	}
}