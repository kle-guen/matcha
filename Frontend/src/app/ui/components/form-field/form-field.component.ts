import {Component, Input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

@Component({
	selector: 'app-form-field',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatOption, MatSelect],
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
	@Input({required: true}) control: FormControl = new FormControl();

	/**
	 * The type of the input
	 */
	@Input() type = 'text';

	/**
	 * The options for the select
	 */
	@Input() options: { value: any, label: string }[] = []; //fixme: defining the object for value/label

	/**
	 * Whether multiple selection is allowed
	 */
	@Input() multipleSelection = false;

	/**
	 * The value of the input
	 */
	@Input() value: string | null = null;
}
