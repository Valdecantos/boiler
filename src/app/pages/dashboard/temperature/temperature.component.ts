import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BoilerService, BoilerItem } from '../../../@core/data/boiler.service';
import { MeasuresService, MeasureItem } from '../../../@core/data/measures.service';

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

  temperature = 22;
  temperatureOff = false;
  temperatureMode = 'cool';

  humidity = 87;
  humidityOff = false;
  humidityMode = 'heat';
  loading = true;
  loaded = -2;

  currentState = new BoilerItem();
  measures: Array<MeasureItem> = [];
  currentMeasure = {} as MeasureItem;

  colors: any;
  themeSubscription: any;
  dataB: any;
  dataM: any;

  constructor(private theme: NbThemeService, private boilerData: BoilerService, private measuresData: MeasuresService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
    });
  }

  ngOnInit() {
    this.getBoilerData();
    this.getMeasuresData();

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  getBoilerData(){
    this.boilerData.getData()
      .subscribe(data => {
        this.currentState.copy(data[0]);
        this.loaded++;
        if (this.loaded === 0){
          this.loading = false;
        }
      });
  }

  getMeasuresData(){
    this.measuresData.getData()
      .subscribe(data => {
        data.forEach(element => {
          this.measures.push(element);
        });
        this.measuresData.copy(this.currentMeasure, this.measures.sort(compare)[0]);
        this.loaded++;
        if (this.loaded === 0){
          this.loading = false;
        }
      });
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
