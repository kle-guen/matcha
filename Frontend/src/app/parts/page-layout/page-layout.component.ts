import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../main-header/main-header.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SocketService} from "../../shared/services/socket.service";
import {NotificationsHttpService} from "../../data/http/notifications-http.service";
import {NotificationsService} from "../../shared/services/notifications-service";

@Component({
	selector: 'app-page-layout',
	standalone: true,
	imports: [
		RouterOutlet,
		HeaderComponent,
	],
	templateUrl: './page-layout.component.html',
	styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent implements OnInit {

	/**
	 * The socket service.
	 */
	private readonly socketService = inject(SocketService);

	/**
	 * The notifications service.
	 */
	private readonly notificationService = inject(NotificationsService);

	/**
	 * The number of notifications.
	 */
	public notificationsCount = 0;

	/**
	 * The change detector ref.
	 */
	private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

	/**
	 * @InheritDoc
	 */
	public ngOnInit(): void {
		this.socketService.startWebSocketConnection();
		this.notificationService.getNotifications();
		this.notificationService.notificationsCount$.subscribe(count => {
			this.notificationsCount = count;
			this.cdr.detectChanges();
		});
	}
}
