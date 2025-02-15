import {inject, Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "./auth-service";
import {SocketDto} from "../../data/dto/socket/socket.dto";
import {NotificationDto} from "../../data/dto/socket/notification.dto";
import {ChatDto} from "../../data/dto/socket/chat.dto";
import {TypeSocketEnum} from "../enums/type-socket.enum";
import {NotificationsService} from "./notifications-service";

@Injectable({
	providedIn: 'root',
})
export class SocketService {
	private socket!: WebSocket;

	private readonly notificationsService = inject(NotificationsService);
	private readonly authService: AuthService = inject(AuthService);

	startWebSocketConnection() {
		const token = this.authService.getToken();
		this.socket = new WebSocket(`ws://backend_container:7000/ws?token=${token}`);

		this.socket.onopen = () => {
			console.log('WebSocket connecté');
			setInterval(() => {
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
			setTimeout(() => this.startWebSocketConnection(), 5000);
		};
	}

	private handleIncomingMessage(msg: SocketDto) {
		console.log('Received message:', msg);

		if (msg.type == TypeSocketEnum.NOTIFICATION ) {
			this.notificationsService.addNotification(msg.data as NotificationDto);
		} else if (msg.type == TypeSocketEnum.CHAT) {
			// this.chatService.addChat(msg.data as ChatDto);
		} else {
			console.error('Unknown message type', msg);
		}
	}
}