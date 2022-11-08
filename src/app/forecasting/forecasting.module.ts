import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { ForecastingRoutingModule } from './forecasting-routing.module';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WeatherComponent, GoogleMapsComponent],
  imports: [
    CommonModule,
    ForecastingRoutingModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
  ],
  exports: [WeatherComponent, GoogleMapsComponent],
})
export class ForecastingModule {}
