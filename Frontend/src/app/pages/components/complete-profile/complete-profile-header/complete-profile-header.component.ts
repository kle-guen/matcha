import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth-service";

@Component({
  selector: 'app-complete-profile-header',
  standalone: true,
	imports: [
		RouterLink
	],
  templateUrl: './complete-profile-header.component.html',
  styleUrl: './complete-profile-header.component.scss'
})
export class CompleteProfileHeaderComponent {

	/**
	 * The auth http service.
	 */
	private readonly authService = inject(AuthService);

	/**
	 * Logs the user out.
	 */
	public logOut(): void {
		this.authService.logOut();
	}
}
