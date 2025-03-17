import {inject, Injectable} from "@angular/core";
import {Observable, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AbstractService} from "../../shared/services/abstract.service";

@Injectable({
	providedIn: "root"
})
export class IpInfoHttpService extends AbstractService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);
	/**
	 * The API URL to get client ip address.
	 */
	private apiUrl = 'https://ipinfo.io/json?token=05385b52108053';

	/**
	 * Get the IP.
	 */
	getIpAddress(): Observable<any> {
		return new Observable<any>(observer => {
			this.http.get(this.apiUrl).pipe(
				takeUntil(this.onDestroy$)
			).subscribe((data: any) => {
				observer.next(data);
				observer.complete();
			});
		});
	}
}