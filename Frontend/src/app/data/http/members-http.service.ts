import {ResearchMembersDto} from "../dto/send/research-members.dto";
import {MemberDto} from "../dto/receive/member.dto";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, of, take, throwError} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {MemberCompleteDto} from "../dto/receive/member-complete.dto";
import {SortResearchMembersEnum} from "../../shared/enums/sort-research-members.enum";
import {MatchDto} from "../dto/receive/match.dto";
import {ResultResearchDto} from "../dto/receive/result-research.dto";

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
	 * @param sortBy
	 */
	researchMembers(researchMembers: ResearchMembersDto, sortBy: SortResearchMembersEnum | null): Observable<ResultResearchDto> {
		const url = `${this.API_MEMBERS_URL}/research`;
		let params: HttpParams = new HttpParams();

		if (sortBy) {
			params = params.set("sortBy", sortBy);
		}

		return this.http.post<ResultResearchDto>(url, researchMembers, {params}).pipe(
			catchError(() => of()),
			take(1)
		);
	}

	/**
	 * Suggest members.
	 * @param sortBy
	 */
	suggestMembers(sortBy: SortResearchMembersEnum | null): Observable<MemberDto[]> {
		const url = `${this.API_MEMBERS_URL}/suggest`;
		let params: HttpParams = new HttpParams();

		if (sortBy) {
			params = params.set("sortBy", sortBy);
		}

		return this.http.get<MemberDto[]>(url, {params}).pipe(
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
			catchError((error) => throwError(() => error)),
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

	getMatches(): Observable<MatchDto[]> {
		const url = `/api/matches`;
		return this.http.get<MatchDto[]>(url).pipe(
			catchError(() => of([])),
			take(1)
		);
	}

	getConnectedUsers(): Observable<number[]> {
		const url = `${this.API_MEMBERS_URL}/connected`;
		return this.http.get<number[]>(url).pipe(
			catchError(() => of([])),
			take(1)
		);
	}

}