import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../button/button.component";
import {UserResultDto} from "../../../data/dto/receive/user-result.dto";

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

	@Input({required: true})
	user!: UserResultDto;

	navigateToUserPage(id: number) {

	}
}
