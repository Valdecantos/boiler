import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../../@core/utils/connection.service';

export class SettingsItem {
  _id: string;
  desired_temp: number;
  top_range: number;
  bottom_range: number;
  min_temp: number;
  schedule: boolean;
  manual: boolean;

  set(item:SettingsItem){
    this._id = item._id;
    this.desired_temp = item.desired_temp;
    this.top_range = item.top_range;
    this.bottom_range = item.bottom_range;
    this.min_temp = item.min_temp;
    this.schedule = item.schedule;
    this.manual = item.manual;
  }
}

@Injectable()
export class SettingsService {

  private connectionUrl = this.connectionService.getBaseUrl()+"settings";
  private httpOptions = {
    headers: new HttpHeaders({
      'cache-control': 'no-cache',
      'x-apikey': this.connectionService.getApiKey(),
      'Content-Type':  'application/json',
    })
  };
  

  constructor(private http: HttpClient, private connectionService: ConnectionService) {
  }


  getData() {
    return this.http.get(this.connectionUrl,this.httpOptions);

  }

}
