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
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {GoogleMapsModule} from "@angular/google-maps";
import {provideNativeDateAdapter} from "@angular/material/core";
import {InterestDto} from "../../../data/dto/receive/interest.dto";
import {PictureDto} from "../../../data/dto/send/picture.dto";
import {GenderEnum} from "../../../shared/enums/gender.enum";
import {SexualPreferenceEnum} from "../../../shared/enums/SexualPreference.enum";
import {locationInterface} from "../../../shared/interfaces/location.interface";
import {ProfileDto} from "../../../data/dto/receive/profile.dto";
import {UserDto} from "../../../data/dto/receive/user.dto";

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
export class UpdateProfileComponent implements OnInit {

	/**
	 * The activated route.
	 */
	private readonly activatedRoute = inject(ActivatedRoute);

	/**
	 * The user
	 */
	public user: UserDto | null = null;

	/**
	 * The update profile form.
	 */
	protected updateProfileForm = new FormGroup({
		firstName: new FormControl<string | null>(null, Validators.required),
		lastName: new FormControl<string | null>(null, Validators.required),
		username: new FormControl<string | null>(null, Validators.required),
		email: new FormControl<string | null>(null, Validators.required),
		profilePicture: new FormControl<PictureDto | null>(null, Validators.required),
		firstAdditionalPicture: new FormControl<PictureDto | null>(null, Validators.required),
		secondAdditionalPicture: new FormControl<PictureDto | null>(null, Validators.required),
		thirdAdditionalPicture: new FormControl<PictureDto | null>(null, Validators.required),
		fourthAdditionalPicture: new FormControl<PictureDto | null>(null, Validators.required),
		birthdate: new FormControl<Date | null>(null, Validators.required),
		gender: new FormControl<GenderEnum | null>(null, Validators.required),
		sexualPreference: new FormControl<SexualPreferenceEnum | null>(null, Validators.required),
		description: new FormControl<string | null>(null, Validators.required),
		interests: new FormControl<InterestDto[]>([], Validators.required),
		location: new FormControl<locationInterface>({latitude: 0, longitude: 0, city: ''}, Validators.required),
	});

	/**
	 * The list of interests.
	 */
	public interests: InterestDto[] = [];

	ngOnInit() {

		this.interests = this.activatedRoute.snapshot.data['interests'];
		this.user = this.activatedRoute.snapshot.data['user'];

		console.log(this.user);

		if (this.user == null) return;
		this.updateProfileForm.patchValue({
				firstName: this.user.firstName,
				lastName: this.user.lastName,
				username: this.user.username,
				email: this.user.email,
				birthdate: new Date(this.user.profile.birthdate),
				gender: this.user.profile.gender,
				sexualPreference: this.user.profile.sexualPreference,
				description: this.user.profile.description,
				interests: this.user.profile.interests,
				location: {latitude: this.user.profile.latitude, longitude: this.user.profile.longitude, city: this.user.profile.city}
			},
		);
		console.log(this.updateProfileForm.value);
	}


	protected readonly GenderEnum = GenderEnum;
	protected readonly SexualPreferenceEnum = SexualPreferenceEnum;
}
