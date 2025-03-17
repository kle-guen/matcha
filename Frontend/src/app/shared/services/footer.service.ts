import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FooterService {
	private footerVisibility = new BehaviorSubject<boolean>(true);
	showFooter$ = this.footerVisibility.asObservable();

	setFooterVisibility(visible: boolean) {
		this.footerVisibility.next(visible);
	}
}