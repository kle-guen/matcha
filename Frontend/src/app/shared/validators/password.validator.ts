import {AbstractControl, ValidatorFn} from "@angular/forms";

/**
 * A password match validator.
 */
export function passwordValidator(): ValidatorFn {
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

/**
 * A password rules validator.
 */
export function passwordRulesValidator(): ValidatorFn {
	return (control: AbstractControl) => {
		const password = control.get('password')?.value;
		const passwordControl = control.get('password');

		if (!password || !passwordControl) {
			return null;
		}
		const hasUppercase = /[A-Z]/;
		const hasLowercase = /[a-z]/;
		const hasNumber = /[0-9]/;
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

		if (!hasUppercase.test(password)) {
			passwordControl.setErrors({uppercase: true});
			return {uppercase: true};
		}

		if (!hasLowercase.test(password)) {
			passwordControl.setErrors({lowercase: true});
			return {lowercase: true};
		}

		if (!hasNumber.test(password)) {
			passwordControl.setErrors({number: true});
			return {number: true};
		}

		if (!hasSpecialChar.test(password)) {
			passwordControl.setErrors({specialChar: true});
			return {specialChar: true};
		}
		return null;
	};
}
