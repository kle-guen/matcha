import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
	selector: 'app-login-header',
	standalone: true,
	imports: [
		MatButton
	],
	templateUrl: './login-header.component.html',
	styleUrl: './login-header.component.scss'
})
export class LoginHeaderComponent {

}
