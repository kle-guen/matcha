import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";

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
	 * The number of notifications.
	 */
	@Input() public notifications: number = 2;

	/**
	 * The number of messages.
	 */
	@Input() public messages: number = 1;
}
