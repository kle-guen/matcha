import {Component, inject} from '@angular/core';
import {CompleteProfileHeaderComponent} from "./complete-profile-header/complete-profile-header.component";
import {ImageUploaderComponent} from "../../../ui/components/image-uploader/image-uploader.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {DatePickerComponent} from "../../../ui/components/date-picker/date-picker.component";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormField} from "@angular/material/form-field";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
	selector: 'app-complete-profile',
	standalone: true,
	providers: [provideNativeDateAdapter()],
	imports: [
		CompleteProfileHeaderComponent,
		ImageUploaderComponent,
		MatCard,
		MatCardContent,
		MatCardHeader,
		MatCardSubtitle,
		MatCardTitle,
		RouterLink,
		DatePickerComponent,
		MatRadioModule,
		MatFormField,
		FormFieldComponent,
		ReactiveFormsModule
	],
	templateUrl: './complete-profile.component.html',
	styleUrl: './complete-profile.component.scss'
})
export class CompleteProfileComponent {

	/**
	 * The form builder.
	 */
	private readonly formBuilder = inject(FormBuilder);

	/**
	 * The complete-profile form.
	 */
	public completeProfileForm = this.formBuilder.group({
		profilePicture: [null as string | null],
		firstAdditionalPicture: [null as string | null],
		secondAdditionalPicture: [null as string | null],
		thirdAdditionalPicture: [null as string | null],
		fourthAdditionalPicture: [null as string | null],
		birthDate: [null as Date | null],
		gender: [null as string | null],
		sexualOrientation: [null as string | null],
		description: [null as string | null],
	});
}
