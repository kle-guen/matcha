import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register-header',
  standalone: true,
	imports: [
		RouterLink
	],
  templateUrl: './register-header.component.html',
  styleUrl: './register-header.component.scss'
})
export class RegisterHeaderComponent {

}
