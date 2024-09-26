import {Component} from '@angular/core';
import {UserCardComponent} from "../ui/user-card/user-card.component";

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		UserCardComponent
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {

}
