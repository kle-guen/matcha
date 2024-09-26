import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
	selector: 'app-landing-header',
	standalone: true,
	imports: [
		MatButton
	],
	templateUrl: './landing-header.component.html',
	styleUrl: './landing-header.component.scss'
})
export class LandingHeaderComponent {

}
