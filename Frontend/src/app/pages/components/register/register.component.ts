import {Component, inject} from '@angular/core';
import {LoginHeaderComponent} from "../login/login-header/login-header.component";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {passwordRulesValidator, passwordValidator} from "../../../shared/validators/password.validator";
import {RegisterDto} from "../../../data/dto/send/register-dto";
import {MatError} from "@angular/material/form-field";
import {UsersHttpService} from "../../../data/http/users-http.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../../shared/utils/create-ng-destroy-subject.fn";

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		LoginHeaderComponent,
		ButtonComponent,
		FormFieldComponent,
		MatCard,
		MatCardContent,
		MatCardHeader,
		MatCardSubtitle,
		MatCardTitle,
		ReactiveFormsModule,
		RouterLink,
		MatError
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {

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
	 * The auth http service.
	 */
	private readonly usersHttpService = inject(UsersHttpService);

	/**
	 * The snack bar.
	 */
	private readonly snackBar = inject(MatSnackBar);

	/**
	 * The form builder.
	 */
	private readonly formBuilder = inject(FormBuilder);

	/**
	 * The router.
	 */
	private readonly _router = inject(Router);

	/**
	 * The register form.
	 */
	protected registerForm = this.formBuilder.group({
			firstName: [null as string | null, [Validators.required, Validators.maxLength(50)]],
			lastName: [null as string | null, [Validators.required, Validators.maxLength(50)]],
			username: [null as string | null, [Validators.required, Validators.maxLength(50)]],
			email: [null as string | null, [Validators.required, Validators.email, Validators.maxLength(255)]],
			password: [null as string | null, [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
			confirmPassword: [null as string | null, Validators.required],
		}, {validators: [passwordValidator(), passwordRulesValidator()]}
	);

	/**
	 * Registers the user.
	 */
	public register(): void {
		const payload: RegisterDto = {
			firstName: this.registerForm.get('firstName')?.value as string,
			lastName: this.registerForm.get('lastName')?.value as string,
			username: this.registerForm.get('username')?.value as string,
			email: this.registerForm.get('email')?.value as string,
			password: this.registerForm.get('password')?.value as string
		};
		this.usersHttpService.createUser(payload).pipe(
			takeUntil(this.onDestroy$)
		).subscribe(success => {
			if (success) {
				this.snackBar.open('User created successfully.', 'Close', {duration: 3000});
				this._router.navigate(['/login']);
			} else {
				this.error = 'Email or username already in use.';
			}
		});
	}
}