import {Component, inject} from '@angular/core';
import {LoginHeaderComponent} from "./login-header/login-header.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {MatCardModule} from "@angular/material/card";
import {Router, RouterModule} from "@angular/router";
import {AuthHttpService} from "../../../data/http/auth-http.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
	 * The error message.
	 */
	public error: string | null = null;

	/**
	 * The router.
	 */
	private readonly router = inject(Router);

	/**
	 * The snack bar.
	 */
	private readonly snackBar = inject(MatSnackBar);

	/**
	 * The form builder.
	 */
	private readonly formBuilder = inject(FormBuilder);

	/**
	 * The auth http service.
	 */
	private readonly authHttpService = inject(AuthHttpService);

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
		const email = this.logInForm.get('email')?.value;
		const password = this.logInForm.get('password')?.value;
		if (!email || !password) return;
		this.authHttpService.logIn(email, password).subscribe((success) => {
			if (success) {
				this.snackBar.open('Logged in successfully', 'Close', {duration: 3000});
				this.router.navigateByUrl('/complete-profile');
			}
			else {
				this.error = 'Invalid email or password';
			}
		});
	}
}
