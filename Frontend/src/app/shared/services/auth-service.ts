import {MatSnackBar} from "@angular/material/snack-bar";
import {inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	/**
	 * The snack bar.
	 */
	private readonly snackBar = inject(MatSnackBar);

	/**
	 * The router.
	 */
	private readonly router = inject(Router);

	/**
	 * Check if the user is authenticated.
	 */
	public isAuthenticated(): boolean {
		return !!localStorage.getItem('matcha-token');
	}

	/**
	 * Get the token.
	 */
	public getToken(): string | null {
		return localStorage.getItem('matcha-token');
	}

	/**
	 * Set the token.
	 * @param token
	 */
	public setToken(token: string): void {
		localStorage.setItem('matcha-token', token);
	}

	public removeToken(): void {
		localStorage.removeItem('matcha-token');
	}

	/**
	 * Logs the user out.
	 */
	public logOut(): void {
		this.removeToken();
		this.snackBar.open('You have been logged out.', 'Close', {duration: 3000});
		this.router.navigate(['/login']);
	}
}