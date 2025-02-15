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
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {GoogleMapsModule} from "@angular/google-maps";
import {provideNativeDateAdapter} from "@angular/material/core";
import {InterestDto} from "../../../data/dto/receive/interest.dto";
import {GenderEnum} from "../../../shared/enums/gender.enum";
import {SexualPreferenceEnum} from "../../../shared/enums/sexual-preference.enum";
import {locationInterface} from "../../../shared/interfaces/location.interface";
import {ProfileUpdateDto} from "../../../data/dto/send/profile-update.dto";
import {ProfileHttpService} from "../../../data/http/profile-http.service";
import {UsersHttpService} from "../../../data/http/users-http.service";
import {UserPicturesDto} from "../../../data/dto/receive/user-pictures.dto";
import {NgOptimizedImage} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {timeout} from "rxjs";

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
		AddressPickerComponent,
		NgOptimizedImage
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
	 * The Form builder.
	 * @private
	 */
	private readonly formBuilder = inject(FormBuilder);


	/**
	 * The profile http service.
	 */
	private readonly profileHttpService = inject(ProfileHttpService);

	/**
	 * The user http service.
	 */
	private readonly userHttpService = inject(UsersHttpService);

	/**
	 * The user
	 */
	public user: UserPicturesDto | null = null;

	/**
	 * The update profile form.
	 */
	protected updateProfileForm = this.formBuilder.group({
		username: [null as string | null, Validators.required],
		email: [null as string | null, Validators.required],
		firstName: [null as string | null, Validators.required],
		lastName: [null as string | null, Validators.required],
		profilePicture: [null as File | null, Validators.required],
		picture1: [null as File | null],
		picture2: [null as File | null],
		picture3: [null as File | null],
		picture4: [null as File | null],
		birthdate: [null as Date | null, Validators.required],
		gender: [null as GenderEnum | null, Validators.required],
		sexualPreference: [null as SexualPreferenceEnum | null, Validators.required],
		description: [null as string | null, Validators.required],
		interests: [[] as string[], Validators.required],
		location: [{latitude: 0, longitude: 0, city: ''} as locationInterface],
	});

	/**
	 * The list of interests.
	 */
	public interests: InterestDto[] = [];

	/**
	 * The router.
	 */
	private readonly router = inject(Router);

	/**
	 * The snackbar.
	 */
	private readonly snackBar = inject(MatSnackBar);

	ngOnInit() {

		this.interests = this.activatedRoute.snapshot.data['interests'];
		this.user = this.activatedRoute.snapshot.data['user'];

		if (this.user == null) return;
		this.updateProfileForm.patchValue({
				firstName: this.user.user.firstName,
				lastName: this.user.user.lastName,
				username: this.user.user.username,
				email: this.user.user.email,
				birthdate: new Date(this.user.user.profile.birthdate),
				gender: this.user.user.profile.gender,
				sexualPreference: this.user.user.profile.sexualPreference,
				description: this.user.user.profile.description,
				interests: this.user.user.profile.interests.map(interest => interest.code),
				profilePicture: this.user.profilePicture,
				picture1: this.user.picture1,
				picture2: this.user.picture2,
				picture3: this.user.picture3,
				picture4: this.user.picture4,
				location: {
					latitude: this.user.user.profile.latitude,
					longitude: this.user.user.profile.longitude,
					city: this.user.user.profile.city
				}
			},
		);
	}

	/**
	 * Completes the profile by sending the form data to the server.
	 */
	public updateProfile() {

		const formData = new FormData();

		const profileData: ProfileUpdateDto = {
			birthdate: this.updateProfileForm.value.birthdate ?? null,
			sexualPreference: this.updateProfileForm.value.sexualPreference ?? null,
			gender: this.updateProfileForm.value.gender ?? null,
			description: this.updateProfileForm.value.description ?? '',
			interests: this.updateProfileForm.value.interests ?? [],
			location: this.updateProfileForm.value.location ?? {latitude: 0, longitude: 0, city: ''},
		};

		formData.append("profileData", JSON.stringify(profileData));
		const pictureFields = [
			'profilePicture', 'picture1', 'picture2',
			'picture3', 'picture4'
		];

		pictureFields.forEach(field => {
			const picture: File = this.updateProfileForm.get(field)?.value;
			if (picture) {
				formData.append(field, picture);
			}
		});

		this.profileHttpService.updateProfile(formData).subscribe();
		this.userHttpService.updateUser({
			firstName: this.updateProfileForm.value.firstName ?? null,
			lastName: this.updateProfileForm.value.lastName ?? null,
			username: this.updateProfileForm.value.username ?? null,
			email: this.updateProfileForm.value.email ?? null
		}).subscribe({
				next: () => {
					setTimeout(() => {
						this.router.navigate(['/members']);
					}, 1000);
					this.snackBar.open('Profile updated', 'Close', {
						duration: 1000,
					});
				},
				error: (err) => {
					console.log(err);
				}
			}
		);
	}

	protected readonly GenderEnum = GenderEnum;
	protected readonly SexualPreferenceEnum = SexualPreferenceEnum;
}
