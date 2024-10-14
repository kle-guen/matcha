import {Component, inject, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../button/button.component";
import {UserResultDto} from "../../../data/dto/receive/user-result.dto";
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

	route = inject(Router)

	@Input({required: true})
	user!: UserResultDto;

	navigateToUserPage(user: UserResultDto) {
		this.route.navigate(['users', user.id],
			{
				state: {user: user}
			});
	}
}
