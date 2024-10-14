import {ResearchUsersDto} from "../dto/send/research-users.dto";
import {UserDto} from "../dto/receive/user.dto";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {UserCompleteDto} from "../dto/receive/user-complete.dto";

@Injectable({
	providedIn: "root"
})
export class UsersHttpService {

	/**
	 * The http client.
	 * @private
	 */
	private readonly http = inject(HttpClient)

	/**
	 * Research users.
	 * @param researchUsers
	 */
	researchUsers(researchUsers: ResearchUsersDto): Observable<UserDto[]> {
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
	 * Get user by id.
	 * @param id
	 */
	getUserById(id: number): Observable<UserCompleteDto> {
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