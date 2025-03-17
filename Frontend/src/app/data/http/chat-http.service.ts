import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {ChatDto} from "../dto/socket/chat.dto";

@Injectable({
	providedIn: 'root',
})
export class ChatHttpService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	private readonly API_CHAT_URL = '/api/messages';

	/**
	 * Get the notifications.
	 */
	public getMessages(): Observable<ChatDto[]> {
		return this.http.get<ChatDto[]>(this.API_CHAT_URL).pipe(
			take(1),
		);
	}

	/**
	 * Send a message.
	 * @param message
	 */
	public sendMessage(message: ChatDto): Observable<any> {
		return this.http.post<ChatDto>(this.API_CHAT_URL, message).pipe(
			take(1),
		);
	}

	public markAsRead(senderId: number): Observable<any> {
		return this.http.put(`${this.API_CHAT_URL}/read/${senderId}`, {}).pipe(
			take(1),
		);
	}
}