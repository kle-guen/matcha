import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {ChatDto} from "../../data/dto/socket/chat.dto";
import {ChatHttpService} from "../../data/http/chat-http.service";

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	/**
	 * The NotificationsHttpService.
	 */
	private readonly chatHttpService = inject(ChatHttpService);

	/**
	 * The notifications count subject.
	 */
	private messagesCountSubject = new BehaviorSubject<number>(0);

	/**
	 * Observable for the number of notifications.
	 */
	public messagesCount$: Observable<number> = this.messagesCountSubject.asObservable();

	/**
	 * The notifications subject.
	 */
	private allMessages: ChatDto[] = [];

	/**
	 * The notifications subject.
	 */
	private messagesSelectedSubject = new BehaviorSubject<ChatDto[]>([]);

	/**
	 * Observable for the notifications
	 */
	public messagesSelected$: Observable<ChatDto[]> = this.messagesSelectedSubject.asObservable();

	/**
	 * The notifications subject.
	 */
	public userSelectedSubject = new BehaviorSubject<number | null>(null);

	/**
	 * Observable for the notifications
	 */
	public userSelected$: Observable<number | null> = this.userSelectedSubject.asObservable();

	/**
	 * Get the notifications.
	 */
	public getMessages() { //constructor ici ?
		this.chatHttpService.getMessages().subscribe(messages => {
			this.allMessages = messages;
			this.messagesCountSubject.next(messages.filter(message => !message.isRead).length);
		});

		this.userSelected$.subscribe(userId => {
			if (userId) {
				const newMessages = this.allMessages.filter(message => message.senderId === userId || message.receiverId === userId);
				newMessages.sort((a, b) => b.createdAt < a.createdAt ? 1 : -1);
				this.messagesSelectedSubject.next(newMessages);
			}
		});
	}

	/**
	 * Add a notification.
	 * @param chat
	 */
	public receiveMessage(chat: ChatDto) {
		if (chat) {
			if (this.userSelectedSubject.value && chat.senderId == this.userSelectedSubject.value) {
				this.chatHttpService.markAsRead(this.userSelectedSubject.value).subscribe({
					next: () => chat.isRead = true
				});
			} else if (!chat.isRead) {
				this.messagesCountSubject.next(this.messagesCountSubject.value + 1);
			}
			this.allMessages.push(chat);
			if (chat.senderId == this.userSelectedSubject.value || chat.receiverId == this.userSelectedSubject.value) {
				this.messagesSelectedSubject.next([...this.messagesSelectedSubject.value, chat]);
			}
		}
	}

	/**
	 * Send a chat.
	 * @param chat
	 */
	public sendMessage(chat: ChatDto) {
		if (chat) {
			this.chatHttpService.sendMessage(chat).subscribe();
		}
	}

	/**
	 * Mark notifications as read.
	 */
	public resetChatCount() {
		this.messagesCountSubject.next(0);
		this.allMessages = this.allMessages.map(message => ({
			...message,
			isRead: true
		}));
	}

	/**
	 * Select a user.
	 * @param userId
	 */
	selectUser(userId: number | null) {
		if (userId != this.userSelectedSubject.value) {
			this.userSelectedSubject.next(userId);
		}
	}
}