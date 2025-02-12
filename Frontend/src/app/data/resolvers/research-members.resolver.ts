import {ResolveFn} from "@angular/router";
import {MemberDto} from "../dto/receive/member.dto";
import {inject} from "@angular/core";
import {MembersHttpService} from "../http/members-http.service";
import {Observable} from "rxjs";

/**
 * The research members resolver.
 */
export const ResearchMembersResolver: ResolveFn<MemberDto[]> = (): Observable<MemberDto[]> => {
	const usersHttpService = inject(MembersHttpService);

	return usersHttpService.suggestMembers(null);
};
