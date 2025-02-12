import {VerifyEmailHttpService} from "../http/verify-email-http.service";
import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {Observable, of} from "rxjs";

/**
 * The verify email resolver.
 * @param route
 */
export const verifyEmailResolver: ResolveFn<boolean | null> = (route: ActivatedRouteSnapshot): Observable<boolean | null> => {
	const verifyEmailHttpService = inject(VerifyEmailHttpService);
	const token = route.queryParams['token'];
	if (!token) {
		return of(null);
	}

	return verifyEmailHttpService.verifyEmail(token);
}