import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, take} from "rxjs";

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
	 * The complete profile method.
	 */
	public completeProfile(formData: FormData) {
		const url = this.API_PROFILE_URL;

		return this.http.post(url, formData).pipe(
			take(1)
		);
	}

	/**
	 * The update profile method.
	 */
	public updateProfile(formData: FormData) {
		const url = this.API_PROFILE_URL;

		return this.http.put(url, formData).pipe(
			take(1),
		);
	}

	/**
	 * Check if profile is completed
	 */
	public isProfileComplete(): Observable<boolean> {
		const url = this.API_PROFILE_URL + '/is-complete';

		return this.http.get<boolean>(url).pipe(
			take(1),
			map(response => {
				return response;
			}),
		);
	}
}