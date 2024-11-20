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
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {AddressPickerComponent} from "../../../ui/components/address-picker/address-picker.component";
import {GeocodingHttpService} from "../../../data/http/geocoding-http.service";

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
	 * The client ip.
	 */
	private ipInfo = this.activatedRoute.snapshot.data['ipInfo'];

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
		interests: [null as { value: any, label: string }[] | null, Validators.required],
		localisation: [null as { latitude: number, longitude: number, city: string } | null, Validators.required],
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
		this.getCurrentPosition();
	}

	private getCurrentPosition(): void {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.geocodingService.getCityFromCoordinates(position.coords.latitude, position.coords.longitude).subscribe(
						(city) => {

							this.completeProfileForm.controls['localisation'].setValue(
								{
									latitude: position.coords.latitude,
									longitude: position.coords.longitude,
									city: city
								}
							);
						}
					);
				})
		} else {
			this.completeProfileForm.controls['localisation'].setValue(
				{
					latitude: this.ipInfo.latitude,
					longitude: this.ipInfo.longitude,
					city: this.ipInfo.city
				}
			);
		}
	}
}
