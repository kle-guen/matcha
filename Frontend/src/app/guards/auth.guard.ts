import {inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {tokenExpired} from "../shared/utils/jwtUtils";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
	providedIn: 'root',
})
export class AuthGuard {
	/**
	 * The router.
	 */
	private readonly router = inject(Router);

	/**
	 * The snack bar.
	 */
	private readonly snackBar = inject(MatSnackBar);

	/**
	 * Determines whether the user can activate the route.
	 */
	public canActivate(): boolean {
		const token = localStorage.getItem('matcha-token');
		if (token && !tokenExpired(token)) {
			return true;
		} else {
			this.snackBar.open('You need to be logged in to access this page.', 'Close', {duration: 3000});
			this.router.navigate(['/login']);
			return false;
		}
	}
}