import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ImagesHttpService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	/**
	 * The history URL.
	 * @private
	 */
	private readonly API_URL = '/api/images';

	getImage(fileName: string): Observable<Blob> {
		const url = `${this.API_URL}/${fileName}`;

		return this.http.get(url, {responseType: 'blob'});
	}

	loadUserImage(img: Blob): string {
		return URL.createObjectURL(img);
	}
}