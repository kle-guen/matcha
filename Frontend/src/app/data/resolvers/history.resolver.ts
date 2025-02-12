import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {HistoryDto} from "../dto/receive/history.dto";
import {HistoryHttpService} from "../http/history-http.service";

/**
 * The research members resolver.
 */
export const historyResolver: ResolveFn<HistoryDto[]> = (): Observable<HistoryDto[]> => {
	const historyHttpService = inject(HistoryHttpService);

	return historyHttpService.getHistory();
}
