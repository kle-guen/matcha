import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../main-header/main-header.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SocketService} from "../../shared/services/socket.service";
import {NotificationsHttpService} from "../../data/http/notifications-http.service";
import {NotificationsService} from "../../shared/services/notifications-service";
import {ChatService} from "../../shared/services/chat-service";
import {FooterComponent} from "../footer/footer.component";
import {FooterService} from "../../shared/services/footer.service";
import {NgClass} from "@angular/common";
import {ConnectionService} from "../../shared/services/connection.service";
import {count, takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../shared/utils/create-ng-destroy-subject.fn";

@Component({
	selector: 'app-page-layout',
	standalone: true,
	imports: [
		RouterOutlet,
		HeaderComponent,
		FooterComponent,
		NgClass,
	],
	templateUrl: './page-layout.component.html',
	styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent implements OnInit, OnDestroy {

	/**
	 * The on destroy
	 * @private
	 */
	private readonly onDestroy$ = createNgDestroySubject();

	/**
	 * The socket service.
	 * @private
	 */
	private readonly socketService = inject(SocketService);

	/**
	 * The notifications service.
	 * @private
	 */
	private readonly notificationService = inject(NotificationsService);

	/**
	 * The chat service.
	 * @private
	 */
	private readonly chatService = inject(ChatService);

	/**
	 * The footer service.
	 */
	private readonly footerService = inject(FooterService);

	/**
	 * The connections/disconnections.
	 */
	private readonly connectionService = inject(ConnectionService);

	/**
	 * The number of notifications.
	 */
	public notificationsCount = 0;

	/**
	 * The number of notifications.
	 */
	public messagesCount = 0;

	/**
	 * The show footer.
	 */
	showFooter = true;

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
		this.connectionService.getConnectedUsers();
		this.notificationService.notificationsCount$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(count => {
			this.notificationsCount = count;
			this.cdr.detectChanges();
		});
		this.chatService.getMessages();
		this.chatService.messagesCount$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(count => {
			this.messagesCount = count;
			this.cdr.detectChanges();
		});
		this.footerService.showFooter$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(visible => {
			this.showFooter = visible;
			this.cdr.detectChanges();
		});
	}

	ngOnDestroy(): void {
		this.socketService.closeWebSocketConnection();
		this.connectionService.destroy();
		this.notificationService.destroy();
		this.chatService.destroy();
	}
}
