import {Component} from '@angular/core';
import {LandingHeaderComponent} from "./landing-header/landing-header.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormFieldComponent} from "../ui/form-field/form-field.component";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
	selector: 'app-landing',
	standalone: true,
	imports: [
		LandingHeaderComponent,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		FormFieldComponent
	],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss'
})
export class LandingComponent {

	/**
	 * The form group for the login form
	 */
	public logInForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl('')
	});

}
