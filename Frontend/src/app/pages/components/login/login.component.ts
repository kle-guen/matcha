import {Component, inject} from '@angular/core';
import {LoginHeaderComponent} from "./landing-header/login-header.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		LoginHeaderComponent,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		FormFieldComponent
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {

	private readonly formBuilder = inject(FormBuilder);

	protected logInForm = this.formBuilder.group({
		email: [null as string | null, Validators.required],
		password: [null as string | null, Validators.required],
	});

}
