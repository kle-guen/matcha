import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {MemberCompleteDto} from "../dto/receive/member-complete.dto";
import {MembersHttpService} from "../http/members-http.service";

@Injectable({
	providedIn: 'root',
})
export class memberProfileResolver implements Resolve<MemberCompleteDto> {
	constructor(private membersHttpService: MembersHttpService) {
	}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<MemberCompleteDto> {
		const memberId = route.params['id'];
		return this.membersHttpService.getMemberById(memberId);
	}
}