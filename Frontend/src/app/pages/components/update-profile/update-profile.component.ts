import {Component, inject, OnInit} from '@angular/core';
import {AddressPickerComponent} from "../../../ui/components/address-picker/address-picker.component";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {
	CompleteProfileHeaderComponent
} from "../complete-profile/complete-profile-header/complete-profile-header.component";
import {DatePickerComponent} from "../../../ui/components/date-picker/date-picker.component";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {ImageUploaderComponent} from "../../../ui/components/image-uploader/image-uploader.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {GoogleMapsModule} from "@angular/google-maps";
import {provideNativeDateAdapter} from "@angular/material/core";
import {ProfileDto} from "../../../data/dto/receive/profile.dto";

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
		AddressPickerComponent
	],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit{

	/**
	 * The activated route.
	 */
	private readonly activatedRoute = inject(ActivatedRoute);

	/**
	 * The user profile.
	 */
	private profile: ProfileDto = {} as ProfileDto;

	/**
	 * The form builder.
	 */
	private readonly formBuilder = inject(FormBuilder);
	
	/**
	 * The update profile form.
	 */
	protected updateProfileForm = this.formBuilder.group({
		name: [null as string | null],
		firstName: [null as string | null],
		username: [null as string | null],
		email: [null as string | null, Validators.email],
		profilePicture: [null as string | null],
		firstAdditionalPicture: [null as string | null],
		secondAdditionalPicture: [null as string | null],
		thirdAdditionalPicture: [null as string | null],
		fourthAdditionalPicture: [null as string | null],
		birthDate: [null as Date | null],
		gender: [null as string | null],
		sexualOrientation: [null as string | null],
		description: [null as string | null],
		interests: [[] as string[]],
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
		this.profile = this.activatedRoute.snapshot.data['profile'];

		this.updateProfileForm.patchValue({
			name: this.profile.name,
			firstName: this.profile.firstName,
			username: this.profile.username,
			email: this.profile.email,
			profilePicture: this.profile.profilePicture,
			firstAdditionalPicture: this.profile.firstAdditionalPicture,
			secondAdditionalPicture: this.profile.secondAdditionalPicture,
			thirdAdditionalPicture: this.profile.thirdAdditionalPicture,
			fourthAdditionalPicture: this.profile.fourthAdditionalPicture,
			birthDate: new Date(this.profile.birthDate),
			gender: this.profile.gender,
			sexualOrientation: this.profile.sexualOrientation,
			description: this.profile.description,
			interests: [...this.profile.interests],
			localisation: this.profile.localisation,
		});
	}
}
