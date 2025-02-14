import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgStyle} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {SocketService} from "../../../shared/services/socket.service";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {TypeNotificationEnum} from "../../../shared/enums/type-notification.enum";
import {NotificationDto} from "../../../data/dto/socket/notification.dto";
import {NotificationsInterface} from "./notifications.interface";
import {ActivatedRoute} from "@angular/router";
import {NotificationsService} from "../../../shared/services/notifications-service";
import {takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../../shared/utils/create-ng-destroy-subject.fn";

@Component({
	selector: 'app-notifications',
	standalone: true,
	imports: [
		DatePipe,
		MatCard,
		MatIcon,
		ButtonComponent,
		NgStyle
	],
	templateUrl: './notifications.component.html',
	styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit, OnDestroy {

	/**
	 * The on destroy
	 * @private
	 */
	private readonly onDestroy$ = createNgDestroySubject();

	/**
	 * The socket service.
	 */
	private readonly notificationsService = inject(NotificationsService);

	/**
	 * The notifications to display.
	 */
	public notificationsToDisplay: NotificationsInterface[] = [];

	/**
	 * Boolean to check if the user has notification history.
	 */
	public hasOldNotifications: boolean = false;

	/**
	 * Boolean to check if the user has unread notifications.
	 */
	public hasUnreadNotifications: boolean = false;

	/**
	 * @inheritDoc
	 */
	public ngOnInit(): void {
		this.notificationsService.notifications$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(notifications => {
			this.hasOldNotifications = notifications.some(notification => notification.isRead);
			this.hasUnreadNotifications = notifications.some(notification => !notification.isRead);
			this.notificationsToDisplay = notifications.sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			});
		});
	}

	/**
	 * @inheritDoc
	 */
	public ngOnDestroy(): void {
		this.notificationsService.resetNotificationsCount();
	}
}
