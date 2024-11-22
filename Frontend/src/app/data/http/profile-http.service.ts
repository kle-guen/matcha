import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ProfileDto} from "../dto/receive/profile.dto";

@Injectable({
	providedIn: "root"
})
export class ProfileHttpService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	getProfile(): Observable<ProfileDto> {
		return of(
			{
				name: 'John Doe',
				firstName: 'John',
				username: 'johndoe',
				email: 'johndoe@gmail.com',
				birthDate: new Date('1996-01-01'),
				profilePicture: 'https://www.google.com',
				firstAdditionalPicture: 'https://www.google.com',
				secondAdditionalPicture: 'https://www.google.com',
				thirdAdditionalPicture: 'https://www.google.com',
				fourthAdditionalPicture: 'https://www.google.com',
				sexualOrientation: 'Straight',
				gender: 'Male',
				interests: [
					'sports'
				],
				description: 'I am a cool guy',
				localisation: 'Paris'
			} as ProfileDto
		);
	}
}