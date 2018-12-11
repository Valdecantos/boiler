import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BoilerService, BoilerItem } from '../../../@core/data/boiler.service';
import { MeasuresService, MeasureItem } from '../../../@core/data/measures.service';
import { SettingsService, SettingsItem } from '../../../@core/data/settings.service';
import { ScheduleService, ScheduleItem } from '../../../@core/data/schedule.service';
import { WeatherService } from '../../../@core/data/weather.service';

function compare(a,b) {
  if (Date.parse(a.date) < Date.parse(b.date))
    return 1;
  if (Date.parse(a.date) > Date.parse(b.date))
    return -1;
  return 0;
}

@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnDestroy {

  temperature = 16;
  temperatureStatus = "off";
  temperatureMode = 'cool';

  humidity = 87;
  humidityOff = false;
  humidityMode = 'heat';
  loading = true;
  loaded = -4;

  currentState = new BoilerItem();
  measures: Array<MeasureItem> = [];
  currentMeasure = new MeasureItem();
  currentSettings = new SettingsItem();
  schedule: Array<ScheduleItem> = [];
  currentSchedule = new ScheduleItem();
  currentWeather: any;
  forecast: any;
  currentDate = new Date(0);

  colors: any;
  themeSubscription: any;
  dataB: any;
  dataM: any;

  constructor(private theme: NbThemeService, 
              private boilerData: BoilerService, 
              private measuresData: MeasuresService, 
              private settingsData: SettingsService,
              private scheduleData: ScheduleService,
              private weatherData: WeatherService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
    });
  }

  ngOnInit() {
    this.getWeatherData();
    this.getBoilerData();
    this.getMeasuresData();
    this.getScheduleData();
    this.getSettingsData();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  getBoilerData(){
    this.boilerData.getData()
      .subscribe(
        data => {
          this.currentState.set(data[0]);
          this.loaded++;
          if (this.loaded === 0){
            this.loading = false;
          }
        },
        error => {
          console.log("La hemos cagado", error);
        });
  }

  getSettingsData(){
    this.settingsData.getData()
      .subscribe(
        data => {
          this.currentSettings.set(data[0]);
          this.temperature = this.currentSettings.desired_temp;
          this.setTemperatureStatus(this.currentSettings.schedule ? 'schedule' : this.currentSettings.manual ? 'manual' : 'off');
          this.setTemperature(this.temperature);
          this.loaded++;
          if (this.loaded === 0){
            this.loading = false;
          }
        },
        error => {
          console.log("La hemos cagado", error);
        });
  }

  getMeasuresData(){
    this.measuresData.getData()
      .subscribe(
        data => {
          data.forEach(element => {
            this.measures.push(element);
          });
          this.currentMeasure.set(this.measures.sort(compare)[0]);
          this.loaded++;
          if (this.loaded === 0){
            this.loading = false;
          }
        },
        error => {
          console.log("La hemos cagado", error);
        });
  }

  getScheduleData(){
    this.scheduleData.getData()
      .subscribe(
        data => {
          if (data.length){
            data.forEach(element => {
              this.schedule.push(element);
            });
            //TO-DO select current schedule
            this.currentSchedule.set(this.schedule[0]);
            this.loaded++;
            if (this.loaded === 0){
              this.loading = false;
            }
          }
        },
        error => {
          console.log("La hemos cagado", error);
        });
  }

  getWeatherData(){
    var data = this.weatherData.getData();
    var forecast = this.weatherData.geForecast();
    this.currentWeather = data.subscribe(resp => {
      this.currentWeather = resp;
    });
    this.forecast = forecast.subscribe(resp => {
      this.forecast = resp;
    });
    this.currentDate = new Date(this.currentWeather.dt*1000);
  }

  setTemperature(_evt){
    document.getElementById('selector-value').textContent = this.temperatureStatus==='off' ? '' : (Math.round(_evt * 10)/10).toString();

    if (Math.round(_evt * 10)/10 === Math.round(_evt)) { 
      document.getElementById('selector-value').classList.remove('decimal');
    } else {
      document.getElementById('selector-value').classList.add('decimal');
    }
  }

  setTemperatureStatus(_evt){
    this.temperatureStatus = _evt;
    switch(_evt){
      case "manual": this.setTemperature(this.currentSettings.desired_temp);
                      break;
      case "schedule": this.setTemperature(this.currentSchedule.desired_temp || this.currentSettings.desired_temp);
                      break;
    }
  }
}
