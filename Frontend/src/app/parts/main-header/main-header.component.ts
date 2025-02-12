import {Component, inject, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {AuthService} from "../../shared/services/auth-service";

@Component({
	selector: 'app-main-header',
	standalone: true,
	imports: [
		RouterLink,
		MatBadgeModule,
		MatIconModule
	],
	templateUrl: './main-header.component.html',
	styleUrl: './main-header.component.scss'
})
export class HeaderComponent {

	/**
	 * The auth http service.
	 */
	private readonly authService = inject(AuthService);

	/**
	 * The number of notifications.
	 */
	@Input() public notificationsCount = 0;

	/**
	 * The number of messages.
	 */
	@Input() public messages: number = 1;

	/**
	 * Logs the user out.
	 */
	public logOut(): void {
		this.authService.logOut();
	}
}
