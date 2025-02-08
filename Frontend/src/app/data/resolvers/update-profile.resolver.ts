import {ResolveFn} from '@angular/router';
import {ProfileHttpService} from "../http/profile-http.service";
import {inject} from "@angular/core";
import {ProfileDto} from "../dto/receive/profile.dto";
import {Observable} from "rxjs";
import {UsersHttpsService} from "../http/users-https.service";
import {UserDto} from "../dto/receive/user.dto";

/**
 * The update profile resolver.
 */
export const updateProfileResolver: ResolveFn<UserDto> = (): Observable<UserDto> => {
	const userHttpService = inject(UsersHttpsService);

	return userHttpService.getMyUser();
};
