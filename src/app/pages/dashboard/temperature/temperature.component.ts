import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BoilerService } from '../../../@core/data/boiler.service';

@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnDestroy {

  temperature = 24;
  temperatureOff = false;
  temperatureMode = 'cool';

  humidity = 87;
  humidityOff = false;
  humidityMode = 'heat';

  colors: any;
  themeSubscription: any;
  data: any;

  constructor(private theme: NbThemeService, private boilerData: BoilerService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      /*var data = boilerData.getData();
      this.data = data.subscribe(resp => {
        console.log("CVGGGGGG",resp);
        this.data = resp;
      });
      */
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }


  setTemperature(_evt){
    document.getElementById('selector-value').textContent = this.temperatureOff ? '---' : (Math.round(_evt * 10)/10).toString();

    if (Math.round(_evt * 10)/10 === Math.round(_evt)) { 
      document.getElementById('selector-value').classList.remove('decimal');
    } else {
      document.getElementById('selector-value').classList.add('decimal');
    }
  }
}
