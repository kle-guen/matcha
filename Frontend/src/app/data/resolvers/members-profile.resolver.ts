import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
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
		const memberId = route.params['id']; // récupère l'id depuis la route
		return this.membersHttpService.getMemberById(memberId); // récupère les données via ton service
	}
}