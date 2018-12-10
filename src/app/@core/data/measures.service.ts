import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../../@core/utils/connection.service';

export class MeasureItem {
  _id: string;
  date: string;
  current_temp: number;
  current_humidity: number;

  set(item:MeasureItem){
    this._id = item._id;
    this.date = item.date;
    this.current_temp = item.current_temp;
    this.current_humidity = item.current_humidity;
  }
}


@Injectable()
export class MeasuresService {

  private connectionUrl = this.connectionService.getBaseUrl()+"measures";
  private httpOptions = {
    headers: new HttpHeaders({
      'cache-control': 'no-cache',
      'x-apikey': this.connectionService.getApiKey(),
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient, private connectionService:ConnectionService) {
  }

  // TODO: observables
  getData() {
    return this.http.get<Array<MeasureItem>>(this.connectionUrl,this.httpOptions);
  }

  copy(item1:MeasureItem, item2:MeasureItem){
    item1._id = item2._id;
    item1.date = item2.date;
    item1.current_temp = item2.current_temp;
    item1.current_humidity = item2.current_humidity;
  }
}
