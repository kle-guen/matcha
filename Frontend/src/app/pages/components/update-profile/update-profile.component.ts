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
import {ProfileDto} from "../../../data/dto/send/profile.dto";

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
		this.profile = this.activatedRoute.snapshot.data['profile'];

		if (this.profile.profileInfo == null || this.profile.userInfo == null || this.profile.pictures.length != 5) return ;
		this.updateProfileForm.patchValue({
			firstName: this.profile.userInfo.firstName,
			lastName: this.profile.userInfo.lastName,
			username: this.profile.userInfo.username,
			email: this.profile.userInfo.email,
			profilePicture: this.profile.pictures[0],
			firstAdditionalPicture: this.profile.pictures[1],
			secondAdditionalPicture: this.profile.pictures[2],
			thirdAdditionalPicture: this.profile.pictures[3],
			fourthAdditionalPicture: this.profile.pictures[4],
			birthdate: this.profile.profileInfo.birthdate,
			gender: this.profile.profileInfo.gender,
			sexualPreference: this.profile.profileInfo.sexualPreference,
			description: this.profile.profileInfo.description,
			interests: [...this.profile.profileInfo.interests],
			location: this.profile.profileInfo.location,
		});
	}
}
