import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, take} from "rxjs";

@Injectable({
	providedIn: "root"
})
export class ForgotPasswordHttpService {

	/**
	 * The verify email URL.
	 */
	private readonly API_URL = '/api/forgot-password';

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	/**
	 * Request a password reset.
	 * @param formData
	 */
	public requestPasswordReset(formData: FormData): Observable<boolean> {
		const url = `${this.API_URL}/request`;
		return this.http.post(url, formData).pipe(
			take(1),
			map(() => {
				return true;
			}),
			catchError(() => {
				return of(false);
			})
		);
	}

	/**
	 * Reset the password.
	 * @param formData
	 * @param token
	 */
	public resetPassword(formData: FormData, token: string): Observable<boolean> {
		const url = `${this.API_URL}/reset?token=${token}`;
		return this.http.post(url, formData).pipe(
			take(1),
			map(() => {
				return true;
			}),
			catchError(() => {
				return of(false);
			})
		);
	}
}
