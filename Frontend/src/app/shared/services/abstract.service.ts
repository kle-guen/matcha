import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AbstractService implements OnDestroy {
	protected readonly onDestroy$ = new Subject<boolean>();

	public destroy() {
		if (!this.onDestroy$.closed) {
			this.onDestroy$.next(true);
			this.onDestroy$.complete();
		}
	}

	ngOnDestroy() {
		this.destroy();
	}
}