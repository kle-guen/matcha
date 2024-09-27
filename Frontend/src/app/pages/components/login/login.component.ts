import {Component, inject} from '@angular/core';
import {LoginHeaderComponent} from "./login-header/login-header.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		LoginHeaderComponent,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		FormFieldComponent,
		ButtonComponent,
		MatCardModule,
		RouterModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {

	/**
	 * The form builder.
	 */
	private readonly formBuilder = inject(FormBuilder);

	/**
	 * The login form.
	 */
	protected logInForm = this.formBuilder.group({
		email: [null as string | null, [Validators.required, Validators.email]],
		password: [null as string | null, [Validators.required, Validators.minLength(8)]],
	});

	/**
	 * Logs the user in.
	 */
	public logIn(): void {
		console.log('Logging in...');
	}
}
