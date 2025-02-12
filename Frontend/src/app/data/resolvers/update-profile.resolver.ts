import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {UsersHttpService} from "../http/users-http.service";
import {UserPicturesDto} from "../dto/receive/user-pictures.dto";

/**
 * The update profile resolver.
 */
export const updateProfileResolver: ResolveFn<UserPicturesDto> = (): Observable<UserPicturesDto> => {
	const userHttpService = inject(UsersHttpService);

	return userHttpService.getMyUser();
};
