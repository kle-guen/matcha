import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class ProfileHttpService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient)


}