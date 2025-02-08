import {AfterViewInit, Component, Input, input, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-address-picker',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './address-picker.component.html',
  styleUrl: './address-picker.component.scss'
})
export class AddressPickerComponent implements OnInit {
  /**
   * The form control for the input
   */
  @Input() control: FormControl = new FormControl();

  /**
   * The google map instance
   */
  private map: any;

  /**
   * The google map marker instance
   */
  private marker: any;

  /**
   * The google map autocomplete instance
   */
  private autocomplete: any;

  /**
   * The latitude of the marker
   */
  public latitude: number | undefined;

  /**
   * The longitude of the marker
   */
  public longitude: number | undefined;

  /**
   * The city of the marker
   */
  public city: string = '';

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this.setLocation();
    this.initMap();
  }

  private setLocation() {
    if (this.control.value) {
      this.latitude = this.control.value.latitude;
      this.longitude = this.control.value.longitude;
    }
  }
  /**
   * Initialize the map and marker
   */
  private initMap() {
    const mapOptions = {
      center: { lat: this.latitude ?? 43.295, lng: this.longitude ?? 5.372},
      zoom: 10,
      fullscreenControl: true,
      mapTypeControl: false,
      zoomControl: true,
      streetViewControl: false,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.marker = new google.maps.Marker({
      position: mapOptions.center,
      map: this.map,
      draggable: true,
    });

    if (this.control.value) {
      this.geocodeAddress(this.control.value);
    }

    this.updateLatLng(this.marker.getPosition()!);


    const locationInput = document.getElementById('location-input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(locationInput, {
      types: ['address'],
      fields: ['geometry', 'address_components', 'name'],
    });

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (!place.geometry) return;

      this.map.setCenter(place.geometry.location);
      this.marker.setPosition(place.geometry.location);

      this.fillInAddress(place);
      this.updateLatLng(this.marker.getPosition()!);
      this.control.setValue({
        latitude: this.latitude,
        longitude: this.longitude,
        city: this.city,
      });
      console.log(this.control.value);
    });
  }

  /**
   * Fill in the address input with the locality
   * @param place
   */
  private fillInAddress(place: google.maps.places.PlaceResult): void {
    const addressComponents = place.address_components || [];
    let localityValue = '';
    addressComponents.some(component => {
      if (component.types.includes('locality')) {
        localityValue = component.long_name;
        this.city = localityValue;
      }
    });

    const localityInputElement = document.getElementById('locality-input') as HTMLInputElement;

    if (localityInputElement) {
      localityInputElement.value = localityValue;
    }
  }

  /**
   * Check out the current location
   */
  public checkout() {
    console.log(this.marker.getPosition().toJSON());
  }

  /**
   * Update the latitude and longitude
   * @param location
   */
  public updateLatLng(location: google.maps.LatLng): void {
    this.latitude = location.lat();
    this.longitude = location.lng();
  }

  /**
   * Geocode the address and update the map and marker
   * @param address
   */
  public geocodeAddress(address: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (results == null) return ;
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;

        this.map.setCenter(location);

        this.marker.setPosition(location);
      }
    });
  }

  /**
   * Get the current position from the browser
   */
  public getCurrentPosition(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
          this.marker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
          this.updateLatLng(this.marker.getPosition()!);
          this.control.setValue({
            latitude: this.latitude,
            longitude: this.longitude,
            city: this.city,
          });
        });
    }
  }
}
