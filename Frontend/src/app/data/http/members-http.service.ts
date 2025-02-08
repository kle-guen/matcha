import {ResearchMembersDto} from "../dto/send/research-members.dto";
import {MemberDto} from "../dto/receive/member.dto";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, take} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {MemberCompleteDto} from "../dto/receive/member-complete.dto";

@Injectable({
	providedIn: "root"
})
export class MembersHttpService {

	/**
	 * The http client.
	 * @private
	 */
	private readonly http = inject(HttpClient);

	/**
	 * The members URL.
	 * @private
	 */
	private readonly API_MEMBERS_URL = '/api/members';

	/**
	 * Research members.
	 * @param researchMembers
	 */
	researchMembers(researchMembers: ResearchMembersDto): Observable<MemberDto[]> {
		const url = `${this.API_MEMBERS_URL}/research`;
		return this.http.post<MemberDto[]>(url, researchMembers).pipe(
			catchError(() => of([])),
			take(1)
		);
	}

	/**
	 * Get member by id.
	 * @param id
	 */
	getMemberById(id: number): Observable<MemberCompleteDto> {
		const url = `${this.API_MEMBERS_URL}/${id}`;
		return this.http.get<MemberCompleteDto>(url).pipe(
			catchError(() => of()),
			take(1)
		);
	}

	/**
	 * Get member by id.
	 * @param id
	 */
	blockMemberById(id: number) {
		const url = `${this.API_MEMBERS_URL}/${id}/block`;
		return this.http.post(url, {}).pipe(
			catchError(() => of()),
			take(1)
		);
	}

	/**
	 * Get member by id.
	 * @param id
	 */
	reportMemberById(id: number) {
		const url = `${this.API_MEMBERS_URL}/${id}/report`;
		return this.http.post(url, {}).pipe(
			catchError(() => of()),
			take(1)
		);
	}

	/**
	 * Get member by id.
	 * @param id
	 */
	likeMemberById(id: number) {
		const url = `${this.API_MEMBERS_URL}/${id}/like`;
		return this.http.post(url, {}).pipe(
			catchError(() => of()),
			take(1)
		);
	}

}