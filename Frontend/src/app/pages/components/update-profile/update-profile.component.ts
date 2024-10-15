import {Component, inject, OnInit} from '@angular/core';
import {AdressPickerComponent} from "../../../ui/components/adress-picker/adress-picker.component";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {
	CompleteProfileHeaderComponent
} from "../complete-profile/complete-profile-header/complete-profile-header.component";
import {DatePickerComponent} from "../../../ui/components/date-picker/date-picker.component";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {ImageUploaderComponent} from "../../../ui/components/image-uploader/image-uploader.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {GoogleMapsModule} from "@angular/google-maps";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-update-profile',
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
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit{

	/**
	 * The form builder.
	 */
	private readonly formBuilder = inject(FormBuilder);
	
	/**
	 * The update profile form.
	 */
	protected updateProfileForm = this.formBuilder.group({
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
