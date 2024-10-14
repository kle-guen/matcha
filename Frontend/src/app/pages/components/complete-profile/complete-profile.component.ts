import {Component, inject, OnInit} from '@angular/core';
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
import {GoogleMapsModule} from "@angular/google-maps";

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
		ReactiveFormsModule,
		GoogleMapsModule
	],
	templateUrl: './complete-profile.component.html',
	styleUrl: './complete-profile.component.scss'
})
export class CompleteProfileComponent implements OnInit {

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
		interests: [null as string[] | null as string | null],
		localisation: [null as string | null],
	});

	interests: { value: any, label: string }[] = [];

	ngOnInit() {
		this.interests = [
			{value: 'sports', label: 'Sports'},
			{value: 'music', label: 'Music'},
			{value: 'movies', label: 'Movies'},
			{value: 'gaming', label: 'Gaming'},
			{value: 'cooking', label: 'Cooking'},
			{value: 'reading', label: 'Reading'},
			{value: 'traveling', label: 'Traveling'},
			{value: 'photography', label: 'Photography'},
			{value: 'fashion', label: 'Fashion'}
		]
	}
}
