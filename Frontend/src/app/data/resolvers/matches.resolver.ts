import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {MembersHttpService} from "../http/members-http.service";
import {Observable} from "rxjs";
import {MatchDto} from "../dto/receive/match.dto";

/**
 * The research members resolver.
 */
export const MatchesResolver: ResolveFn<MatchDto[]> = (): Observable<MatchDto[]> => {
	const membersHttpService = inject(MembersHttpService);

	return membersHttpService.getMatches();
};
