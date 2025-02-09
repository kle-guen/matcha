import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {Observable, of} from "rxjs";
import {InterestDto} from "../dto/receive/interest.dto";
import {InterestsHttpService} from "../http/interests-http.service";
import {HistoryDto} from "../dto/receive/history.dto";
import {HistoryHttpService} from "../http/history-http.service";

/**
 * The research members resolver.
 */
export const historyResolver: ResolveFn<HistoryDto[]> = (): Observable<HistoryDto[]> => {
	const historyHttpService = inject(HistoryHttpService);

	return historyHttpService.getHistory();
}
