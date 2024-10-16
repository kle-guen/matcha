import {AfterViewInit, Component} from '@angular/core';
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-adress-picker',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './adress-picker.component.html',
  styleUrl: './adress-picker.component.scss'
})
export class AdressPickerComponent implements AfterViewInit {
  map: any;
  marker: any;
  autocomplete: any;

  public latitude: number | undefined;
  public longitude: number | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    // Define the map and marker options
    const mapOptions = {
      center: { lat: 48.853655925458604, lng: 2.3474816535156195 },
      zoom: 10,
      fullscreenControl: true,
      mapTypeControl: false,
      zoomControl: true,
      streetViewControl: false,
    };

    // Initialize the map
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    // Initialize the marker
    this.marker = new google.maps.Marker({
      position: mapOptions.center,
      map: this.map,
      draggable: false, // Allow marker to be dragged
    });

    this.updateLatLng(this.marker.getPosition()!);


    // Initialize Autocomplete
    const locationInput = document.getElementById('location-input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(locationInput, {
      types: ['address'],
      fields: ['geometry', 'address_components', 'name'],
    });

    // Set an event listener for when the user selects an address
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (!place.geometry) {
        window.alert(`No details available for input: '${place.name}'`);
        return;
      }

      // Update the map center and marker position
      this.map.setCenter(place.geometry.location);
      this.marker.setPosition(place.geometry.location);

      // Optionally: Fill in the form with address components
      this.fillInAddress(place);
      this.updateLatLng(this.marker.getPosition()!);
    });

    // Listen for drag events on the marker
    google.maps.event.addListener(this.marker, 'dragend', () => {
      const position = this.marker.getPosition();
      this.updateLatLng(this.marker.getPosition()!);
      console.log('Marker moved to: ', position.lat(), position.lng());
    });
  }

  fillInAddress(place: google.maps.places.PlaceResult): void {
    // Get the address components from the place result
    const addressComponents = place.address_components || [];

    // Initialize a variable to hold the locality value
    let localityValue = '';

    // Loop through the address components to find the locality
    addressComponents.forEach(component => {
      if (component.types.includes('locality')) {
        localityValue = component.long_name; // Get the long name of the locality
      }
    });

    // Find the input element by ID
    const localityInputElement = document.getElementById('locality-input') as HTMLInputElement;

    // Check if the input element exists before setting the value
    if (localityInputElement) {
      localityInputElement.value = localityValue; // Set the value of the locality input
    } else {
      console.warn("Input element with ID 'locality-input' not found.");
    }
  }

  checkout() {
    // Handle checkout logic here
    console.log(this.marker.getPosition().toJSON());
  }

  public updateLatLng(location: google.maps.LatLng): void {
    this.latitude = location.lat();
    this.longitude = location.lng();
  }
}
