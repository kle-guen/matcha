import {Component, Input} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
	selector: 'app-date-picker',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
	templateUrl: './date-picker.component.html',
	styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {

	/**
	 * The form control.
	 */
	@Input({required: true}) control: FormControl = new FormControl();

	/**
	 * The current date.
	 */
	private readonly _currentDate = new Date()

	/**
	 * The minimum date.
	 */
	readonly minDate = new Date(this._currentDate.getFullYear() - 120, this._currentDate.getMonth(), this._currentDate.getDate());

	/**
	 * The maximum date.
	 */
	readonly maxDate = new Date(this._currentDate.getFullYear() - 18, this._currentDate.getMonth(), this._currentDate.getDate());
}
