import {Component} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
	selector: 'app-date-picker',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
	templateUrl: './date-picker.component.html',
	styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {

	private readonly _currentDate = new Date()
	readonly minDate = new Date(this._currentDate.getFullYear() - 120, this._currentDate.getMonth(), this._currentDate.getDate());
	readonly maxDate = new Date(this._currentDate.getFullYear() - 18, this._currentDate.getMonth(), this._currentDate.getDate());
}
