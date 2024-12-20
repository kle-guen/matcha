import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../dto/send/user-dto";
import {catchError, map, Observable, of, take} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class UsersHttpsService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	/**
	 * The users URL.
	 */
	private API_USERS_URL = '/api/users';

	/**
	 * Create a user.
	 * @param payload
	 */
	public createUser(payload: UserDto): Observable<boolean> {
		const url = this.API_USERS_URL;
		return this.http.post<UserDto>(url, payload).pipe(
			take(1),
			map(response => {
				return !!response;
			}),
			catchError(() => {
				return of(false);
			})
		);
	}
}