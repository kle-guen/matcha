import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, take} from "rxjs";
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
	 * The complete profile method.
	 */
	public completeProfile(formData: FormData): Observable<ProfileDto> {
		const url = this.API_PROFILE_URL;

		return this.http.post<ProfileDto>(url, formData).pipe(
			take(1),
			map(response => {
				return response;
			}),
		);
	}

	/**
	 * The get profile method.
	 */
	public getMyProfile(): Observable<ProfileDto> {
		const url = this.API_PROFILE_URL + '/me';
		return this.http.get<ProfileDto>(url).pipe(
			take(1),
			map(response => {
				return response;
			}),
		);
	}

	/**
	 * The get profile by id method.
	 */
	public getProfileById(id: number): Observable<ProfileDto> {
		const url = `${this.API_PROFILE_URL}/${id}`;

		return this.http.get<ProfileDto>(url).pipe(
			take(1),
			map(response => {
				return response;
			}),
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