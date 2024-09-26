import {Component, Input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
	selector: 'app-form-field',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
	templateUrl: './form-field.component.html',
	styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {

	/**
	 * The label for the form field
	 */
	@Input() label = '';

	/**
	 * The form control for the input
	 */
	@Input() control: FormControl = new FormControl();

	/**
	 * The type of the input
	 */
	@Input() type = 'text';
}
