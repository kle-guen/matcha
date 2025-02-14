import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, takeUntil} from "rxjs";
import {MembersHttpService} from "../../data/http/members-http.service";
import {AbstractService} from "./abstract.service";

@Injectable({
	providedIn: 'root'
})
export class ConnectionService extends AbstractService{

	/**
	 * The members http service.
	 */
	private readonly membersHttpService = inject(MembersHttpService);

	/**
	 * The notifications count subject.
	 */
	public connectedMembersSubject = new BehaviorSubject<number[]>([]);

	/**
	 * Observable for the number of notifications.
	 * @private
	 */
	public connectedMembers$ = this.connectedMembersSubject.asObservable();

	/**
	 * Get the notifications.
	 */
	public getConnectedUsers() {
		this.membersHttpService.getConnectedUsers().pipe(
			takeUntil(this.onDestroy$)
		).subscribe(ids => {
			this.connectedMembersSubject.next(ids);
		});
	}

	public addConnectedUser(id: number) {
		if (!this.connectedMembersSubject.value.includes(id)) {
			this.connectedMembersSubject.next([...this.connectedMembersSubject.value, id]);
		}
	}

	public removeConnectedUser(id: number) {
		if (this.connectedMembersSubject.value.includes(id)) {
			this.connectedMembersSubject.next(this.connectedMembersSubject.value.filter(i => i !== id));
		}
	}
}