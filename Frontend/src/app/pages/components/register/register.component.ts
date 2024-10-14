import {Component, inject} from '@angular/core';
import {LoginHeaderComponent} from "../login/login-header/login-header.component";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";

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
		RouterLink
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {

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
			name: [null as string | null, Validators.required],
			firstName: [null as string | null, Validators.required],
			username: [null as string | null, Validators.required],
			email: [null as string | null, [Validators.required, Validators.email]],
			password: [null as string | null, [Validators.required, Validators.minLength(8)]],
			confirmPassword: [null as string | null, [Validators.required, Validators.minLength(8)]],
		}, {validators: passwordMatchValidator()}
	);

	/**
	 * Registers the user.
	 */
	public register(): void {
		console.log('Registering...');
		this._router.navigate(['/complete-profile']);
	}
}

/**
 * A password match validator.
 */
export function passwordMatchValidator(): ValidatorFn {
	return (control: AbstractControl) => {
		const password = control.get('password')?.value;
		const confirmPassword = control.get('confirmPassword')?.value;

		if (password === confirmPassword) {
			return null;
		} else {
			control.get('confirmPassword')?.setErrors({mismatch: true});
			return {mismatch: true};
		}
	};
}
