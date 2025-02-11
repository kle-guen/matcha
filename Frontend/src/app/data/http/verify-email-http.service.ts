import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, take} from "rxjs";

@Injectable({
	providedIn: "root"
})
export class VerifyEmailHttpService {

	/**
	 * The verify email URL.
	 */
	private readonly API_URL = '/api/verify-email';

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	/**
	 * Verify the email.
	 * @param token
	 */
	public verifyEmail(token: string): Observable<boolean> {
		const url = `${this.API_URL}?token=${token}`;

		return this.http.post(url, {}).pipe(
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
