import {ResolveFn} from "@angular/router";
import {UserDto} from "../dto/receive/user.dto";
import {inject} from "@angular/core";
import {UsersHttpService} from "../http/users-http.service";
import {ResearchUsersDto} from "../dto/send/research-users.dto";
import {Observable} from "rxjs";

/**
 * The research users resolver.
 * @constructor
 */
export const ResearchUsersResolver: ResolveFn<UserDto[]> = (): Observable<UserDto[]> => {
	const usersHttpService = inject(UsersHttpService);

	return usersHttpService.researchUsers(new ResearchUsersDto());
};
