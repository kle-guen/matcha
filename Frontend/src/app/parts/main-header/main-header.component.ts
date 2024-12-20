import {Component, inject, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {AuthHttpService} from "../../data/http/auth-http.service";

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
	private readonly authHttpService = inject(AuthHttpService);

	/**
	 * The number of notifications.
	 */
	@Input() public notifications: number = 2;

	/**
	 * The number of messages.
	 */
	@Input() public messages: number = 1;

	/**
	 * Logs the user out.
	 */
	public logOut(): void {
		this.authHttpService.logOut();
	}
}
