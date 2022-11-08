import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  selectedCityVal = false;
  validateLatlng = false;
  weatherDetails: any;
  // lat: any = 51.5464785;
  // lon: any = 0.0549158;
  // aPIKey: any = 'fe3695759da76e0c9dcaf566634a08ed';
  // url =
  //   'https://api.openweathermap.org/data/2.5/forecast?lat=' +
  //   this.lat +
  //   '&lon=' +
  //   this.lon +
  //   '&appid=' +
  //   this.aPIKey;

  weatherForm = new FormGroup({
    searchedCity: new FormControl(''),
  });

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    // this.api.getData('https://api.openweathermap.org/data/2.5/forecast?lat=51.5464785&lon=0.0549158&appid=fe3695759da76e0c9dcaf566634a08ed').subscribe((data) => {
    // this.service.getData(this.url).subscribe((data) => {
    //   console.log(data);
    // });
    this.service.latlangValues.subscribe((data) => {
      if (JSON.parse(JSON.stringify(data)).lat) {
        this.validateLatlng = true;
        console.log('##################', data);
      } else {
        this.validateLatlng = false;
      }
    });
    this.service.selectedCity.subscribe((data) => {
      this.selectedCityVal = data;
    });

    this.service.weatherDetails.subscribe((data) => {
      let dayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      this.weatherDetails = data;
      if (data) {
        this.weatherDetails.list.forEach((element: any, index: number) => {
          //let day = dayName[new Date().getDay()];
          //   console.log(element);

          element.id = 'element' + index;

          element.dayName = dayName[new Date(element.dt_txt).getDay()];
        });
      }
      console.log('================================', this.weatherDetails.list);
    });
  }

  onSubmit() {
    this.service.onSubmit(this.weatherForm.value);
  }
}
