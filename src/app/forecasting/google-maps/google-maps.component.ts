import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './../../services/api.service';
declare var $: any;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {
  selectedCityVal: any;
  getlatlan: any;
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 51.5072178, lng: -0.1275862 },
  ];
  // markerPositions: any = [{}];
  center: google.maps.LatLngLiteral = { lat: 51.5072178, lng: -0.1275862 };
  // center: any;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  zoom = 10;
  constructor(public service: ApiService) {
    this.service.latlangValues.subscribe((data) => {
      this.getlatlan = JSON.parse(JSON.stringify(data));
      this.center.lat = parseFloat(this.getlatlan.lat);
      this.center.lng = parseFloat(this.getlatlan.lng);
      this.markerPositions[0].lat = parseFloat(this.getlatlan.lat);
      this.markerPositions[0].lng = parseFloat(this.getlatlan.lng);
    });
  }

  ngOnInit(): void {
    // if (
    //   (this.service.cityName !== '' || undefined) &&
    //   this.service.latlangValues
    // ) {
    //   this.service.selectedCity.subscribe((data) => {
    //     this.selectedCityVal = data;
    //     if (data) {
    //       this.service.latlangValues.subscribe((data) => {
    //         debugger;
    //         this.markerPositions[0].lat = parseFloat(
    //           JSON.parse(JSON.stringify(data)).lat
    //         );
    //         this.markerPositions[0].lng = parseFloat(
    //           JSON.parse(JSON.stringify(data)).lng
    //         );
    //         this.center.lat = this.markerPositions[0].lat;
    //         this.center.lng = this.markerPositions[0].lng;
    //         console.log('&&&&&&&&&&&&&&&&&&&&', this.markerPositions);
    //       });
    //     }
    //   });
    // }
  }

  addMarker(event: any) {
    this.markerPositions.push(event.latLng.toJSON());
  }
}
