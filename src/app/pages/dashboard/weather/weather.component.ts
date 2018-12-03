import { Component } from '@angular/core';
import { WeatherService } from '../../../@core/data/weather.service'

@Component({
  selector: 'ngx-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})

export class WeatherComponent {

  data: any;
  forecast: any;
  fiveDays: any;

  constructor(private weatherData: WeatherService) {
      var data = weatherData.getData();
      var forecast = weatherData.geForecast();
      this.data = data.subscribe(resp => {
        this.data = resp;
      });
      this.forecast = forecast.subscribe(resp => {
        this.forecast = resp;
      });
  }

  aprox(data: any){
    //this.fiveDays = this.forecast.list && this.forecast.list.filter(fore => fore.dt_txt.indexOf("12:00:00") !== -1)

    return data['list'] && data['list'].filter(fore => fore.dt_txt.indexOf("12:00:00") !== -1);
  }

  getIconClass(data){
   var returnClass="ion-ios-sunny";

   if (data !== undefined){
    switch (data[0].icon){
      case "01d": returnClass = "ion-ios-sunny-outline";
                break;
      case "02d": returnClass = "ion-ios-partlysunny-outline";
                break;
      case "03d": 
      case "03n": 
                  returnClass = "ion-ios-cloudy-outline";
                  break;
      case "04d":
      case "04n": 
                  returnClass = "ion-ios-cloudy-outline";
                  break;
      case "09d":
      case "09n": 
                  returnClass = "ion-ios-rainy-outline";
                  break;
      case "10d": 
      case "10n": 
                  returnClass = "ion-ios-rainy-outline";
                  break;
      case "11d":
      case "11n": 
                  returnClass = "ion-ios-thunderstorm-outline";
                  break;
      case "13d": 
      case "13n": 
                  returnClass = "ion-ios-snowy";
                  break;
      case "50d":
      case "50n": 
                  returnClass = "nb-menu";
                  break;
      /****************/       
      case "01n": returnClass = "ion-ios-moon-outline";
          break;
      case "02n": returnClass = "ion-ios-cloudy-night-outline";
        break; 
    }
  }
    return returnClass;

  }

}
