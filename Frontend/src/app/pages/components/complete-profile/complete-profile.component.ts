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
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {AdressPickerComponent} from "../../../ui/components/adress-picker/adress-picker.component";

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
		GoogleMapsModule,
		ButtonComponent,
		AdressPickerComponent
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
		profilePicture: [null as string | null, Validators.required],
		firstAdditionalPicture: [null as string | null, Validators.required],
		secondAdditionalPicture: [null as string | null, Validators.required],
		thirdAdditionalPicture: [null as string | null, Validators.required],
		fourthAdditionalPicture: [null as string | null, Validators.required],
		birthDate: [null as Date | null, Validators.required],
		gender: [null as string | null, Validators.required],
		sexualOrientation: [null as string | null, Validators.required],
		description: [null as string | null, Validators.required],
		interests: [null as string[] | null as string | null, Validators.required],
		localisation: [null as string | null, Validators.required],
	});

	/**
	 * The list of interests.
	 */
	public interests: { value: any, label: string }[] = [];

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
