import {Component, inject} from '@angular/core';
import {LandingHeaderComponent} from "./landing-header/landing-header.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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

	private readonly formBuilder = inject(FormBuilder);

	protected logInForm = this.formBuilder.group({
		email: [null as string | null, Validators.required],
		password: [null as string | null, Validators.required],
	});

}
