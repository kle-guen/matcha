import {inject} from '@angular/core';
import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from "../shared/services/auth-service";

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	/**
	 * The auth http service.
	 */
	const authService = inject(AuthService);

	/**
	 * The jwt token.
	 */
	const token = authService.getToken();

	// Add Authorization header if token exists
	const authReq = token
		? req.clone({
			setHeaders: {Authorization: `Bearer ${token}`},
		})
		: req;

	// Handle the request and catch errors
	return next(authReq).pipe(
		catchError((error) => {
			if (error.status === 401) {
				authService.logOut();
			}
			return throwError(() => error);
		})
	);
};
