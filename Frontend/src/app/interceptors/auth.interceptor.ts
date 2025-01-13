import {inject} from '@angular/core';
import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthHttpService} from "../data/http/auth-http.service";

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	/**
	 * The auth http service.
	 */
	const authHttpService = inject(AuthHttpService);

	/**
	 * The jwt token.
	 */
	const token = localStorage.getItem('matcha-token');

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
				authHttpService.logOut();
			}
			return throwError(() => error);
		})
	);
};
