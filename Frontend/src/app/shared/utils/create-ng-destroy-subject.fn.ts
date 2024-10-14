import {DestroyRef, inject} from "@angular/core";
import {Observable, Subject} from "rxjs";

export function createNgDestroySubject(): Observable<boolean> {
	const subject: Subject<boolean> = new Subject<boolean>();

	inject(DestroyRef).onDestroy(() => {
		if (!subject.closed) {
			subject.next(true);
			subject.complete();
		}
	});

	return subject.asObservable();
}
