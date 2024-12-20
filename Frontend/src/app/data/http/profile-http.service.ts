import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, take} from "rxjs";
import {ProfileDto} from "../dto/receive/profile.dto";

@Injectable({
	providedIn: "root"
})
export class ProfileHttpService {

	/**
	 * The login URL.
	 */
	private readonly API_PROFILE_URL = '/api/profiles';

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	/**
	 * The comlete profile URL.
	 */
	public completedProfile(formData: FormData): Observable<ProfileDto> {
		const url = this.API_PROFILE_URL;

		return this.http.post<ProfileDto>(url, formData).pipe(
			take(1),
			map(response => {
				return response;
			}),
		)
	}

	getProfile(): Observable<any> {
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
				location: 'Paris'
			}
		);
	}
}