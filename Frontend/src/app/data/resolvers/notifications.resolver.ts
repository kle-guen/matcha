import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {NotificationsHttpService} from "../http/notifications-http.service";

export const NotificationsResolver: ResolveFn<any> = (route, state) => {
	const notificationsHttpService = inject(NotificationsHttpService);
	return notificationsHttpService.getNotifications();
}