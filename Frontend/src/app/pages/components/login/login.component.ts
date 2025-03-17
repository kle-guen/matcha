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
import {HttpErrorResponse} from "@angular/common/http";
import {ProfileHttpService} from "../../../data/http/profile-http.service";
import {takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../../shared/utils/create-ng-destroy-subject.fn";
import {passwordRulesValidator, passwordValidator} from "../../../shared/validators/password.validator";

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
	 * The on destroy
	 * @private
	 */
	private readonly onDestroy$ = createNgDestroySubject();

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

	private readonly profileHttpService = inject(ProfileHttpService);

	/**
	 * The login form.
	 */
	protected logInForm = this.formBuilder.group({
		username: [null as string | null, Validators.required, Validators.maxLength(50)],
		password: [null as string | null, [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
	}, {validators: passwordRulesValidator()});

	/**
	 * Logs the user in.
	 */
	public logIn(): void {
		const username = this.logInForm.get('username')?.value;
		const password = this.logInForm.get('password')?.value;
		if (!username || !password) return;
		this.authHttpService.logIn(username, password).pipe(
			takeUntil(this.onDestroy$)
		).subscribe({
			next: (success) => {
				if (success) {
					this.snackBar.open('Logged in successfully', 'Close', {duration: 3000});

					this.profileHttpService.isProfileComplete().pipe(
						takeUntil(this.onDestroy$)
					).subscribe({
						next: (isComplete) => {
							if (isComplete) {
								this.router.navigateByUrl('/members');
							} else {
								this.router.navigateByUrl('/complete-profile');
							}
						},
						error: (error) => {
							this.error = error.error.title;
						}
					});
				} else {
					this.error = 'Invalid username or password';
				}
			},
			error: (error: HttpErrorResponse) => {
				console.error(error);
				this.error = error.error.title;
			}
		});
	}
}
