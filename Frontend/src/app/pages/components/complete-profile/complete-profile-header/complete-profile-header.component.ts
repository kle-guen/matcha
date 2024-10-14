import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

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

}
