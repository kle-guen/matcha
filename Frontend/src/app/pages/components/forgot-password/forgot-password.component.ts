import {Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {LoginHeaderComponent} from "../login/login-header/login-header.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {passwordRulesValidator, passwordValidator} from "../../../shared/validators/password.validator";
import {ForgotPasswordHttpService} from "../../../data/http/forgot-password-http.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
	imports: [
		ButtonComponent,
		FormFieldComponent,
		LoginHeaderComponent,
		MatCard,
		MatCardContent,
		MatCardHeader,
		MatCardSubtitle,
		MatCardTitle,
		ReactiveFormsModule,
		RouterLink
	],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {

	/**
	 * The reset password token.
	 */
	public token: string | null = null;

	/**
	 * The email sent status.
	 */
	public emailSent: boolean = false;

	/**
	 * The error message.
	 */
	public error: string | null = null;

	/**
	 * The form builder.
	 */
	private readonly formBuilder = inject(FormBuilder);

	/**
	 * The activated route.
	 */
	private readonly activatedRoute = inject(ActivatedRoute);

	/**
	 * The router.
	 */
	private readonly router = inject(Router);

	/**
	 * The snack bar.
	 */
	private readonly snackBar = inject(MatSnackBar);

	/**
	 * The forgot password http service.
	 */
	private readonly forgotPasswordHttpService = inject(ForgotPasswordHttpService);

	/**
	 * The request password reset form.
	 */
	protected emailForm = this.formBuilder.group({
		email: [null as string | null, [Validators.required, Validators.email]],
	});

	/**
	 * The reset password form.
	 */
	protected resetPasswordForm = this.formBuilder.group({
		password: [null as string | null, [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
		confirmPassword: [null as string | null, Validators.required],
		}, {validators: [passwordValidator(), passwordRulesValidator()]});

	/**
	 * @inheritDoc
	 */
	public ngOnInit(): void {
		this.token = this.activatedRoute.snapshot.queryParams['token'];
	}

	public forgotPassword() {
		const email = this.emailForm.value.email;
		const formData = new FormData();
		if (email == null) return;
		formData.append('email', email);
		this.forgotPasswordHttpService.requestPasswordReset(formData).subscribe({
			next: (success) => {
				if (success) {
					this.emailSent = true;
					this.error = null;
				} else {
					this.error = 'An error occurred';
				}
			},
			error: (error) => {
				this.error = error.error;
			}
		});
	}

	/**
	 * Resets the password.
	 */
	public resetPassword() {
		const password = this.resetPasswordForm.value.password;
		const formData = new FormData();
		if (password == null || this.token == null) return;
		formData.append('password', password);
		this.forgotPasswordHttpService.resetPassword(formData, this.token).subscribe({
			next: (success) => {
				if (success) {
					this.error = null;
					setTimeout(() => {
						this.router.navigateByUrl('/login');
					}, 1000);
					this.snackBar.open('Password reset successfully', 'Close', {duration: 1000});

				} else {
					this.error = 'An error occurred';
				}
			},
			error: (error) => {
				this.error = error.error;
			}
		});
	}
}
