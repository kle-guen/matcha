import {ResolveFn} from "@angular/router";
import {MemberDto} from "../dto/receive/member.dto";
import {inject} from "@angular/core";
import {MembersHttpService} from "../http/members-http.service";
import {ResearchMembersDto} from "../dto/send/research-members.dto";
import {Observable} from "rxjs";
import {InterestDto} from "../dto/receive/interest.dto";
import {InterestsHttpService} from "../http/interests-http.service";

/**
 * The research members resolver.
 */
export const InterestsResolver: ResolveFn<InterestDto[]> = (): Observable<InterestDto[]> => {
	const interestsHttpService = inject(InterestsHttpService);

	return interestsHttpService.getInterests();
}
