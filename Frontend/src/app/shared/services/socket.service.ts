import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';
import { switchMap, retryWhen, delay, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
	private socket!: WebSocket;
	private messageSubject = new Subject<any>();
	private reconnectAttempts = 0;
	private readonly maxReconnectAttempts = 5;
	private readonly reconnectDelay = 3000; // Délai entre les tentatives de reconnexion (3 secondes)
	private isConnected = false;

	connect(url: string): void {
		this.initializeWebSocket(url);
	}

	private initializeWebSocket(url: string): void {
		this.socket = new WebSocket(url);

		// Gérer les messages reçus
		this.socket.onmessage = (event) => {
			this.messageSubject.next(JSON.parse(event.data));
		};

		// Gérer les erreurs
		this.socket.onerror = (error) => {
			console.error('Erreur WebSocket:', error);
		};

		// Gérer la fermeture (et tenter de reconnecter)
		this.socket.onclose = () => {
			console.warn('WebSocket déconnecté.');
			this.isConnected = false;
			if (this.reconnectAttempts < this.maxReconnectAttempts) {
				this.reconnectAttempts++;
				console.log(`Tentative de reconnexion (${this.reconnectAttempts})...`);
				timer(this.reconnectDelay)
					.pipe(
						tap(() => console.log('Nouvelle tentative de connexion...')),
						switchMap(() => this.retryConnection(url)),
					)
					.subscribe();
			} else {
				console.error('Nombre maximum de tentatives atteint.');
			}
		};

		// État connecté
		this.socket.onopen = () => {
			console.log('Connexion WebSocket établie.');
			this.isConnected = true;
			this.reconnectAttempts = 0; // Réinitialiser les tentatives en cas de succès
		};
	}

	private retryConnection(url: string): Observable<void> {
		return new Observable<void>((observer) => {
			this.initializeWebSocket(url);
			observer.next();
			observer.complete();
		});
	}

	sendMessage(message: any): void {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(message));
		} else {
			console.error('Impossible d\'envoyer le message, WebSocket non connecté.');
		}
	}

	getMessages(): Observable<any> {
		return this.messageSubject.asObservable();
	}

	disconnect(): void {
		if (this.socket) {
			this.socket.close();
		}
	}

	ngOnDestroy(): void {
		this.disconnect();
	}
}
