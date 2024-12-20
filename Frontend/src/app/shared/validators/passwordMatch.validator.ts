import {AbstractControl, ValidatorFn} from "@angular/forms";

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
