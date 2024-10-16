import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SocketService {

	/**
	 * The socket.
	 * @private
	 */
	private readonly socket: Socket;

	/**
	 * The constructor
	 */
	constructor() {
		this.socket = io('http://localhost:3000');
	}

	/**
	 * Listen to an event.
	 * @param eventName the event name
	 */
	listen(eventName: string): Observable<any> {
		return new Observable((subscriber) => {
			this.socket.on(eventName, (data) => {
				subscriber.next(data);
			});
		});
	}

	/**
	 * Emit an event.
	 * @param eventName the event name
	 * @param data the data
	 */
	emit(eventName: string, data: any): void {
		this.socket.emit(eventName, data);
	}

	/**
	 * Disconnect the socket.
	 */
	disconnect(): void {
		if (this.socket) {
			this.socket.disconnect();
		}
	}
}