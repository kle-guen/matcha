import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../dto/send/register-dto";
import {catchError, map, Observable, of, take} from "rxjs";
import {UserDto} from "../dto/receive/user.dto";

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
	public createUser(payload: RegisterDto): Observable<boolean> {
		const url = this.API_USERS_URL;
		return this.http.post<RegisterDto>(url, payload).pipe(
			take(1),
			map(response => {
				return !!response;
			}),
			catchError(() => {
				return of(false);
			})
		);
	}

	/**
	 * Get a user by id.
	 * @param id
	 */
	public getUserById(id: number): Observable<UserDto> {
		const url = `${this.API_USERS_URL}/${id}`;

		return this.http.get<UserDto>(url).pipe(
			take(1),
			map(response => {
				return response;
			}),
		);
	}

	/**
	 * Get a user by id.
	 */
	public getMyUser(): Observable<UserDto> {
		const url = `${this.API_USERS_URL}/me`;

		return this.http.get<UserDto>(url).pipe(
			take(1),
			map(response => {
				return response;
			}),
		);
	}
}