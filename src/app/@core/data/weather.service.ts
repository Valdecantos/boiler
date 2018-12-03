import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

  private weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Madrid,es&lang=es&appid=96d0ae529e7e60785d24d135a65c4bef&units=metric";
  private forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Madrid,es&lang=es&appid=96d0ae529e7e60785d24d135a65c4bef&units=metric";

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get(this.weatherUrl);
  }
  geForecast() {
    return this.http.get(this.forecastUrl);
  }

}
