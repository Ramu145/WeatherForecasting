import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  aPIKey: any = 'fe3695759da76e0c9dcaf566634a08ed';
  latlangValues = new BehaviorSubject({});
  selectedCity = new BehaviorSubject(false);
  selectedCityName = new BehaviorSubject('');
  cityName: string = '';
  weatherDetails = new BehaviorSubject([]);
  getlatLngUrl: any;

  geoData: any;
  constructor(private http: HttpClient) {}

  getData(url: string) {
    return this.http.get(url);
  }
  onSubmit(form: any) {
    this.selectedCityName.next(JSON.parse(JSON.stringify(form)).searchedCity);
    this.selectedCityName.subscribe((data) => {
      this.cityName = data;
      if (this.cityName !== '' || undefined) {
        this.getlatLngUrl =
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          this.cityName +
          '&key=AIzaSyAW2uhDjutJaXg5otC_mZoSaW3TRTiS63c';

        this.getData(this.getlatLngUrl).subscribe((data) => {
          if ((this.selectedCity && this.cityName !== '') || undefined) {
            this.geoData = JSON.parse(
              JSON.stringify(data)
            ).results[0].geometry.location;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%', this.geoData);
            this.latlangValues.next(this.geoData);
            this.getweatherReport();
          }
        });
        this.selectedCity.next(true);
      }
    });
  }
  getweatherReport() {
    let lat = this.geoData.lat;
    let lng = this.geoData.lng;
    console.log(lat, lng);

    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      lat +
      '&lon=' +
      lng +
      '&appid=' +
      this.aPIKey;

    this.getData(url).subscribe((data) => {
      console.log(data);
      this.weatherDetails.next(JSON.parse(JSON.stringify(data)));
    });
  }
}
