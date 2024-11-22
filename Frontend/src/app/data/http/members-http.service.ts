import {ResearchMembersDto} from "../dto/send/research-members.dto";
import {MemberDto} from "../dto/receive/member.dto";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
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
	private readonly API_MEMBERS_URL = '/api/users';

	/**
	 * Research members.
	 * @param researchMembers
	 */
	researchMembers(researchMembers: ResearchMembersDto): Observable<MemberDto[]> {
		const url = `${this.API_MEMBERS_URL}/research`;
		return of([
			{
				id: 1,
				name: 'John Doe',
				age: '25',
				nickname: 'johndoe',
				description: 'Hello, I am John Doe.',
				sexe: 'H'
			},
			{
				id: 2,
				name: 'Jane Doe',
				age: '22',
				nickname: 'janedoe',
				description: 'Hello, I am Jane Doe.',
				sexe: 'F'
			},
			{
				id: 3,
				name: 'Alice',
				age: '21',
				nickname: 'alice',
				description: 'Hello, I am Alice.',
				sexe: 'F'
			},
			{
				id: 4,
				name: 'Bob',
				age: '24',
				nickname: 'bob',
				description: 'Hello, I am Bob.\nI like sports.\nI like music.\nI like movies.\nI like gaming.\nI like cooking.\nI like reading.\nI like traveling.\nI like photography.\nI like fashion.Hello, I am Bob.\nI like sports.\nI like music.\nI like movies.\nI like gaming.\nI like cooking.\nI like reading.\nI like traveling.\nI like photography.\nI like fashion.',
				sexe: 'H'
			}
		]);
	}

	/**
	 * Get member by id.
	 * @param id
	 */
	getMemberById(id: number): Observable<MemberCompleteDto> {
		const url = `${this.API_MEMBERS_URL}/${id}`;
		this.http.get(url).subscribe((data: any) => {});
		return of({
			id: 1,
			name: 'John Doe',
			age: '25',
			nickname: 'johndoe',
			description: 'Hello, I am John Doe.',
			sexe: 'H',
			city: "",
			interests: [],
			sexuality: "",
		});
	}
}