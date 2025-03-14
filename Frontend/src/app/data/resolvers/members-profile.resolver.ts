import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MemberCompleteDto } from '../dto/receive/member-complete.dto';
import { MembersHttpService } from '../http/members-http.service';

@Injectable({
	providedIn: 'root',
})
export class memberProfileResolver implements Resolve<MemberCompleteDto> {
	constructor(
		private membersHttpService: MembersHttpService,
		private router: Router
	) {}

	resolve(route: ActivatedRouteSnapshot): Observable<MemberCompleteDto> {
		const memberId = route.params['id'];

		return this.membersHttpService.getMemberById(memberId).pipe(
			catchError((error) => {
				this.router.navigate(['/members']);
				return EMPTY;
			})
		);
	}
}