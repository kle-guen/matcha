import {ResolveFn} from "@angular/router";
import {UserResultDto} from "../dto/receive/user-result.dto";
import {inject} from "@angular/core";
import {UsersHttpService} from "../http/users-http.service";
import {ResearchUsersDto} from "../dto/send/research-users.dto";
import {Observable} from "rxjs";

export const UsersResolver: ResolveFn<UserResultDto[]> = (
	route,
	state): Observable<UserResultDto[]> => {
	const usersHttpService = inject(UsersHttpService);
	return usersHttpService.researchUsers(new ResearchUsersDto());
};
