import {VerifyEmailHttpService} from "../http/verify-email-http.service";
import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {Observable} from "rxjs";

/**
 * The verify email resolver.
 * @param route
 */
export const verifyEmailResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot): Observable<boolean> => {
	const verifyEmailHttpService = inject(VerifyEmailHttpService);
	const token = route.queryParams['token'];

	return verifyEmailHttpService.verifyEmail(token);
}