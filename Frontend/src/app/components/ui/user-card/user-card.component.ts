import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [
		MatCardModule
	],
	templateUrl: './user-card.component.html',
	styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

}
