import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {NotificationDto} from "../../data/dto/socket/notification.dto";
import {ChatDto} from "../../data/dto/socket/chat.dto";
import {NotificationsHttpService} from "../../data/http/notifications-http.service";
import {NotificationsInterface} from "../../pages/components/notifications/notifications.interface";
import {TypeNotificationEnum} from "../enums/type-notification.enum";

@Injectable({
	providedIn: 'root'
})
export class NotificationsService {

	/**
	 * The NotificationsHttpService.
	 */
	private readonly notificationHttpService: NotificationsHttpService = inject(NotificationsHttpService);

	/**
	 * The notifications count subject.
	 */
	private notificationsCountSubject = new BehaviorSubject<number>(0);

	/**
	 * The notifications subject.
	 */
	private notificationsSubject = new BehaviorSubject<NotificationsInterface[]>([]); // Store notifications

	/**
	 * Observable for the notifications
	 */
	public notifications$: Observable<NotificationsInterface[]> = this.notificationsSubject.asObservable();

	/**
	 * Observable for the number of notifications.
	 */
	public notificationsCount$: Observable<number> = this.notificationsCountSubject.asObservable();

	/**
	 * The dislike subject.
	 */
	public dislikeSubject = new BehaviorSubject<string>('');

	/**
	 * Observable for the id of the disliker.
	 */
	public dislike$: Observable<string> = this.dislikeSubject.asObservable();

	/**
	 * Get the notifications.
	 */
	public getNotifications(): void {
		this.notificationHttpService.getNotifications().subscribe(notifications => {
			const processedNotification = notifications.map(this.processNotification).filter(notification => notification !== null) as NotificationsInterface[];
			this.notificationsSubject.next(processedNotification);
			this.notificationsCountSubject.next(processedNotification.filter(notification => !notification.isRead).length);
		});
	}

	/**
	 * Add a notification.
	 * @param notification
	 */
	public addNotification(notification: NotificationDto): void {
		const newNotification = this.processNotification(notification);
		if (newNotification) {
			this.notificationsSubject.next([newNotification, ...this.notificationsSubject.value]);
			this.notificationsCountSubject.next(this.notificationsCountSubject.value + 1);
		}
	}

	/**
	 * Converts a notification to a display notification.
	 * @param notification.
	 */
	private processNotification(notification: NotificationDto): NotificationsInterface | null {
		let newNotification: NotificationsInterface | null = null;
		switch (notification.type) {
			case TypeNotificationEnum.LIKE:
				newNotification = {
					username: notification.username,
					type: notification.type,
					date: notification.date,
					label: `${notification.username} liked your profile`,
					icon: 'favorite',
					color: '#DC2626',
					isRead: notification.isRead
				};
				break;
			case TypeNotificationEnum.VISIT:
				newNotification = {
					username: notification.username,
					type: notification.type,
					date: notification.date,
					label: `${notification.username} has seen your profile`,
					icon: 'visibility',
					color: '#007bff',
					isRead: notification.isRead
				};
				break;
			case TypeNotificationEnum.MESSAGE:
				newNotification = {
					username: notification.username,
					type: notification.type,
					date: notification.date,
					label: `${notification.username} sent you a message`,
					icon: 'message',
					color: '#007bff',
					isRead: notification.isRead
				};
				break;
			case TypeNotificationEnum.MATCH:
				newNotification = {
					username: notification.username,
					type: notification.type,
					date: notification.date,
					label: `${notification.username} matched with you`,
					icon: 'favorite',
					color: '#ffc107',
					isRead: notification.isRead
				};
				break;
			case TypeNotificationEnum.UNLIKE:
				newNotification = {
					username: notification.username,
					type: notification.type,
					date: notification.date,
					label: `${notification.username} unliked your profile`,
					icon: 'favorite_border',
					color: '#6c757d',
					isRead: notification.isRead
				};
				this.dislikeSubject.next(notification.username);
				break;
			default:
				break;
		}
		return newNotification;
	}

	/**
	 * Mark notifications as read.
	 */
	public resetNotificationsCount(): void {
		this.notificationsCountSubject.next(0);
		this.notificationsSubject.next(this.notificationsSubject.value.map(notification => {
			notification.isRead = true;
			return notification;
		}));
	}
}