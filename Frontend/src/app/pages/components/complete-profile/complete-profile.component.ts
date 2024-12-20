import {Component, inject, OnInit} from '@angular/core';
import {CompleteProfileHeaderComponent} from "./complete-profile-header/complete-profile-header.component";
import {ImageUploaderComponent} from "../../../ui/components/image-uploader/image-uploader.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatePickerComponent} from "../../../ui/components/date-picker/date-picker.component";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormField} from "@angular/material/form-field";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {AddressPickerComponent} from "../../../ui/components/address-picker/address-picker.component";
import {GeocodingHttpService} from "../../../data/http/geocoding-http.service";
import {InterestDto} from "../../../data/dto/receive/interest.dto";
import {PictureDto} from "../../../data/dto/send/picture.dto";
import {locationInterface} from "../../../shared/interfaces/location.interface";
import {profileInfoInterface} from "../../../shared/interfaces/profile-info.interface";
import {ProfileHttpService} from "../../../data/http/profile-http.service";
import {GenderEnum} from "../../../shared/enums/gender.enum";
import {SexualPreferenceEnum} from "../../../shared/enums/SexualPreference.enum";

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
		AddressPickerComponent
	],
	templateUrl: './complete-profile.component.html',
	styleUrl: './complete-profile.component.scss'
})
export class CompleteProfileComponent implements OnInit {

	/**
	 * The geocoding service.
	 */
	private readonly geocodingService = inject(GeocodingHttpService);

	/**
	 * The activated route.
	 */
	private readonly activatedRoute = inject(ActivatedRoute);

	/**
	 * The profile http service.
	 */
	private readonly profileHttpService = inject(ProfileHttpService);

	/**
	 * The client ip.
	 */
	private ipInfo = this.activatedRoute.snapshot.data['ipInfo'];

	/**
	 * The gender enum.
	 */
	public genderEnum = GenderEnum;

	/**
	 * The sexual orientation enum.
	 */
	public sexualPreferenceEnum = SexualPreferenceEnum;

	/**
	 * @inheritDoc
	 */
	ngOnInit() {
		this.interests = this.activatedRoute.snapshot.data['interests'];
		this.getCurrentPosition();
	}

	/**
	 * The complete-profile form.
	 */
	public completeProfileForm = new FormGroup({
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

	/**
	 * Gets the current position.
	 * If the user denies the geolocation request, the fallback location is set.
	 */
	private getCurrentPosition(): void {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.geocodingService.getCityFromCoordinates(position.coords.latitude, position.coords.longitude).subscribe(
						(city) => {
							this.completeProfileForm.controls['location'].setValue({
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
								city: city
							});
						},
						(err) => {
							this.setFallbackLocation();
						}
					);
				},
				(err) => {
					this.setFallbackLocation();
				}
			);
		} else {
			this.setFallbackLocation();
		}
	}

	/**
	 * Sets the fallback location.
	 */
	private setFallbackLocation(): void {
		const [latitude, longitude] = this.ipInfo.loc.split(',').map((cord: string) => parseFloat(cord));
		this.completeProfileForm.controls['location'].setValue({
			latitude,
			longitude,
			city: this.ipInfo.city
		});
	}

	public log() {
		console.log(this.completeProfileForm.value);
	}

	/**
	 * Completes the profile by sending the form data to the server.
	 */
	public completeProfile() {

		const formData = new FormData();

		const profileData: profileInfoInterface = {
			birthdate: this.completeProfileForm.value.birthdate ?? null,
			sexualPreference: this.completeProfileForm.value.sexualPreference ?? null,
			gender: this.completeProfileForm.value.gender ?? null,
			description: this.completeProfileForm.value.description ?? '',
			interests: this.completeProfileForm.value.interests?.map(
				(interest: InterestDto) => {
					return {code: interest.code, label: interest.label};
				}) ?? []
			,
			location: this.completeProfileForm.value.location ?? {latitude: 0, longitude: 0, city: ''},
		};

		formData.append("profileData", JSON.stringify(profileData));
		const pictureFields = [
			'profilePicture', 'firstAdditionalPicture', 'secondAdditionalPicture',
			'thirdAdditionalPicture', 'fourthAdditionalPicture'
		];

		pictureFields.forEach(field => {
			const picture: PictureDto = this.completeProfileForm.get(field)?.value;
			if (picture.file) {
				formData.append('pictures', picture.file);
			}
		});

		this.profileHttpService.completedProfile(formData).subscribe(
			(response) => {
				console.log(response);
			},
			(err) => {
				console.error(err);
			}
		);
	}
}
