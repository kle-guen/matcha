import {Component, inject, OnInit} from '@angular/core';
import {CompleteProfileHeaderComponent} from "./complete-profile-header/complete-profile-header.component";
import {ImageUploaderComponent} from "../../../ui/components/image-uploader/image-uploader.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatePickerComponent} from "../../../ui/components/date-picker/date-picker.component";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormField} from "@angular/material/form-field";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {AddressPickerComponent} from "../../../ui/components/address-picker/address-picker.component";
import {GeocodingHttpService} from "../../../data/http/geocoding-http.service";
import {InterestDto} from "../../../data/dto/receive/interest.dto";
import {locationInterface} from "../../../shared/interfaces/location.interface";
import {ProfileUpdateDto} from "../../../data/dto/send/profile-update.dto";
import {ProfileHttpService} from "../../../data/http/profile-http.service";
import {GenderEnum} from "../../../shared/enums/gender.enum";
import {SexualPreferenceEnum} from "../../../shared/enums/sexual-preference.enum";
import {takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../../shared/utils/create-ng-destroy-subject.fn";

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
	 * The on destroy
	 * @private
	 */
	private readonly onDestroy$ = createNgDestroySubject();

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
	 * The router.
	 */
	private readonly router = inject(Router);

	/**
	 * The form builder.
	 */
	private readonly formBuilder = inject(FormBuilder);

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
	public completeProfileForm = this.formBuilder.group({
		profilePicture: [null as File | null, Validators.required],
		picture1: null as File | null,
		picture2: null as File | null,
		picture3: null as File | null,
		picture4: null as File | null,
		birthdate: [null as Date | null, Validators.required],
		gender: [null as GenderEnum | null, Validators.required],
		sexualPreference: [null as SexualPreferenceEnum | null, Validators.required],
		description: [null as string | null, Validators.required],
		interests: [[] as string[], Validators.required],
		location: [{latitude: 0, longitude: 0, city: ''} as locationInterface, Validators.required],
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
					this.geocodingService.getCityFromCoordinates(position.coords.latitude, position.coords.longitude).pipe(
						takeUntil(this.onDestroy$)
					).subscribe(
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

	/**
	 * Completes the profile by sending the form data to the server.
	 */
	public completeProfile() {

		const formData = new FormData();

		const profileData: ProfileUpdateDto = {
			birthdate: this.completeProfileForm.value.birthdate ?? null,
			sexualPreference: this.completeProfileForm.value.sexualPreference ?? null,
			gender: this.completeProfileForm.value.gender ?? null,
			description: this.completeProfileForm.value.description ?? '',
			interests: this.completeProfileForm.value.interests ?? [],
			location: this.completeProfileForm.value.location ?? {latitude: 0, longitude: 0, city: ''},
		};

		formData.append("profileData", JSON.stringify(profileData));
		const pictureFields = [
			'profilePicture', 'picture1', 'picture2',
			'picture3', 'picture4'
		];

		pictureFields.forEach(field => {
			const picture: File = this.completeProfileForm.get(field)?.value;
			if (picture) {
				formData.append(field, picture);
			}
		});

		this.profileHttpService.completeProfile(formData).pipe(
			takeUntil(this.onDestroy$)
		).subscribe(
			() => {
				this.router.navigate(['/members']);
			},
			(err) => {
				console.error(err);
			}
		);
	}
}
