import {ResearchUsersDto} from "../dto/send/research-users.dto";
import {UserResultDto} from "../dto/receive/user-result.dto";
import {AbstractHttpService} from "./abstract-http.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class UsersHttpService extends AbstractHttpService {

	constructor(http: HttpClient) {
		super(http);
	}

	researchUsers(researchUsers: ResearchUsersDto): Observable<UserResultDto[]> {
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

	getUserById(id: number): Observable<UserResultDto> {
		return of(
			{
				id: 1,
				name: 'John Doe',
				age: '25',
				nickname: 'johndoe',
				description: 'Hello, I am John Doe.',
				sexe: 'H'
			});
	}

}