import {Component, inject, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../button/button.component";
import {UserDto} from "../../../data/dto/receive/user.dto";
import {Router} from "@angular/router";

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [
		MatCardModule,
		ButtonComponent
	],
	templateUrl: './user-card.component.html',
	styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

	/**
	 * The router.
	 * @private
	 */
	route = inject(Router)

	/**
	 * The user.
	 */
	@Input({required: true})
	user!: UserDto;

	/**
	 * Navigate to the user page.
	 * @param user
	 */
	navigateToUserPage(user: UserDto) {
		this.route.navigate(['users', user.id],
			{
				state: {user: user}
			});
	}
}
