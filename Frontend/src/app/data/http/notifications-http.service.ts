import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {NotificationDto} from "../dto/socket/notification.dto";
import {map, Observable, take} from "rxjs";

@Injectable({
	providedIn: 'root',
})
export class NotificationsHttpService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	private readonly API_NOTIFICATIONS_URL = '/api/notifications';

	/**
	 * Gets the notifications.
	 */
	public getNotifications(): Observable<NotificationDto[]> {
		const url = this.API_NOTIFICATIONS_URL;

		return this.http.get<NotificationDto[]>(url).pipe(
			take(1),
			map(response => {
				return response;
			})
		);
	}
}