import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable, takeUntil} from "rxjs";
import {NotificationDto} from "../../data/dto/socket/notification.dto";
import {NotificationsHttpService} from "../../data/http/notifications-http.service";
import {NotificationsInterface} from "../../pages/components/notifications/notifications.interface";
import {TypeNotificationEnum} from "../enums/type-notification.enum";
import {AbstractService} from "./abstract.service";

@Injectable({
	providedIn: 'root'
})
export class NotificationsService extends AbstractService{

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
	public dislikeSubject = new BehaviorSubject<number | null>(null);

	/**
	 * Observable for the id of the disliker.
	 */
	public dislike$: Observable<number | null> = this.dislikeSubject.asObservable();

	/**
	 * The dislike subject.
	 */
	public matchSubject = new BehaviorSubject<NotificationDto | null>(null);

	/**
	 * Observable for the id of the disliker.
	 */
	public match$: Observable<NotificationDto | null> = this.matchSubject.asObservable();

	/**
	 * The dislike subject.
	 */
	public blockSubject = new BehaviorSubject<number>(0);

	/**
	 * Observable for the id of the disliker.
	 */
	public block$: Observable<number> = this.blockSubject.asObservable();

	/**
	 * Get the notifications.
	 */
	public getNotifications(): void {
		this.notificationHttpService.getNotifications().pipe(
			takeUntil(this.onDestroy$)
		).subscribe(notifications => {
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
		switch (notification.type) {
			case TypeNotificationEnum.MATCH:
				this.matchSubject.next(notification);
				break;
			case TypeNotificationEnum.UNLIKE:
				this.dislikeSubject.next(notification.userId);
				break;
		}
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