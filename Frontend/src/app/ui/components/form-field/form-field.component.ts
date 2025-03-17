import {Component, Input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {InterestDto} from "../../../data/dto/receive/interest.dto";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
	selector: 'app-form-field',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatOption, MatSelect, MatIcon, MatIconButton],
	templateUrl: './form-field.component.html',
	styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {


	public selected = "HIKING";
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
	@Input() options: InterestDto[] = []; //fixme: defining the object for value/label

	/**
	 * Whether multiple selection is allowed
	 */
	@Input() multipleSelection = false;

	/**
	 * The value of the input
	 */
	@Input() value: string | null = null;

	/**
	 * The icon for the input
	 */
	@Input() icon: string | null = null;

	/**
	 * The autocomplete for the input
	 */
	@Input() autocomplete: string | null = null;

	/**
	 * Function to compare the interests for the select
	 */
	public compareInterests(value: string, option: string): boolean {
		return option === value;
	}

	sendEvent($event: MouseEvent) {
		console.log($event);
	}
}
