import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class IpInfoHttpService {

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
			this.http.get(this.apiUrl).subscribe((data: any) => {
				observer.next(data);
				observer.complete();
			});
		});
	}
}