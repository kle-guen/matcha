import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, take} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {InterestDto} from "../dto/receive/interest.dto";

@Injectable({
	providedIn: "root"
})
export class InterestsHttpService {

	/**
	 * The http client.
	 * @private
	 */
	private readonly http = inject(HttpClient);

	/**
	 * The interests URL.
	 * @private
	 */
	private readonly API_URL = '/api';

	/**
	 * Get interests.
	 * @returns The interests.
	 */
	getInterests(): Observable<InterestDto[]> {
		const url = `${this.API_URL}/interests`;
		return this.http.get<InterestDto[]>(url).pipe(
			catchError(() => of([])),
			take(1)
		);
	}

	/**
	 * Get the interests of a member.
	 * @returns The interests of the member.
	 */
	getUserInterests(userId: number): Observable<InterestDto[]> {
		const url = `${this.API_URL}/users/${userId}/interests`;
		return this.http.get<InterestDto[]>(url);
	}
}