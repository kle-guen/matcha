import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, take} from "rxjs";
import {HistoryDto} from "../dto/receive/history.dto";
import {log} from "node:util";

@Injectable({
	providedIn: "root"
})
export class HistoryHttpService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	/**
	 * The history URL.
	 * @private
	 */
	private readonly API_URL = '/api/history';

	/**
	 * Get interests.
	 * @returns The interests.
	 */
	getHistory(): Observable<HistoryDto[]> {
		const url = `${this.API_URL}`;
		return this.http.get<HistoryDto[]>(url).pipe(
			catchError(() => of([])),
			take(1)
		);
	}

}