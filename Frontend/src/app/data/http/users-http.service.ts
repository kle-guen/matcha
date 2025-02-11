import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../dto/send/register-dto";
import {catchError, map, Observable, of, take} from "rxjs";
import {UserUpdateDto} from "../dto/send/user-update.dto";
import {UserPicturesDto} from "../dto/receive/user-pictures.dto";

@Injectable({
	providedIn: 'root'
})
export class UsersHttpService {

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
	 * Create a user.
	 * @param payload
	 */
	public updateUser(payload: UserUpdateDto) {
		const url = this.API_USERS_URL;
		return this.http.put(url, payload).pipe(
			take(1),
		);
	}

	/**
	 * Get a user by id.
	 */
	public getMyUser(): Observable<UserPicturesDto> {
		const url = `${this.API_USERS_URL}/me`;

		return this.http.get<any>(url).pipe(
			take(1),
			map(response => {
				// Vérifie chaque photo et convertit en File si nécessaire
				if (response.profilePicture && typeof response.profilePicture === 'string') {
					response.profilePicture = this.convertBase64ToFile(response.profilePicture, 'profilePicture.jpg');
				}

				if (response.picture1 && typeof response.picture1 === 'string') {
					response.picture1 = this.convertBase64ToFile(response.picture1, 'picture1.jpg');
				}

				if (response.picture2 && typeof response.picture2 === 'string') {
					response.picture2 = this.convertBase64ToFile(response.picture2, 'picture2.jpg');
				}

				if (response.picture3 && typeof response.picture3 === 'string') {
					response.picture3 = this.convertBase64ToFile(response.picture3, 'picture3.jpg');
				}

				if (response.picture4 && typeof response.picture4 === 'string') {
					response.picture4 = this.convertBase64ToFile(response.picture4, 'picture4.jpg');
				}

				return response;
			}),
		);
	}

	convertBase64ToFile(base64String: string, fileName: string): File {
		const byteCharacters = atob(base64String); // Décoder la base64 en caractères binaires
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
			const slice = byteCharacters.slice(offset, offset + 1024);
			const byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}
			byteArrays.push(new Uint8Array(byteNumbers));
		}

		return new File(byteArrays, fileName, {type: 'image/jpeg'}); // Assumer ici le type MIME image/jpeg
	}
}