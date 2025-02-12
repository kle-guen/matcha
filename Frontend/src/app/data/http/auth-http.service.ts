import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, take} from "rxjs";
import {Router} from "@angular/router";
import {RegisterDto} from "../dto/send/register-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../shared/services/auth-service";

@Injectable({
	providedIn: 'root',
})
export class AuthHttpService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	/**
	 * The auth service.
	 */
	private readonly authService = inject(AuthService);

	/**
	 * The login URL.
	 */
	private readonly API_AUTH_URL = '/api/auth/token';

	/**
	 * Logs the user in.
	 * @param email
	 * @param password
	 */
	public logIn(email: string, password: string): Observable<boolean> {
		const url = this.API_AUTH_URL;

		return this.http.post<any>(url, {email, password}).pipe(
			take(1),
			map(response => {
				if (response?.token) {
					this.authService.setToken(response.token);
					return true;
				} else {
					return false;
				}
			})
		);
	}

	/**
	 * Registers the user.
	 * @param payload
	 */
	public register(payload: RegisterDto): Observable<boolean> {
		const url = this.API_AUTH_URL;

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
}