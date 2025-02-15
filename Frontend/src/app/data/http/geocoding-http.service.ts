import {inject, Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class GeocodingHttpService {

	/**
	 * The http client.
	 */
	private readonly http = inject(HttpClient);

	/**
	 * The geocode URL.
	 */
	private geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

	/**
	 * Get city from coordinates.
	 * @param lat
	 * @param lng
	 */
	getCityFromCoordinates(lat: number, lng: number): Observable<string> {
		const url = `${this.geocodeUrl}?latlng=${lat},${lng}&key=AIzaSyCOVydJvZx2X78SsGcw4pS0zLkCOB6NBDY`;
		if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
			console.error("Invalid latitude or longitude values:", lat, lng);
			return of('');
		}
		return new Observable<any>(observer => {
			this.http.get(url).subscribe((data: any) => {
				let city = '';
				if (data.results.length > 0) {
					data.results[0].address_components.forEach((addressComponent: any) => {
						if (addressComponent.types.includes('locality')) {
							city = addressComponent.long_name;
						}
					});
				}
				observer.next(city);
				observer.complete();
			});
		});
	}
}
