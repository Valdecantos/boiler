import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../../@core/utils/connection.service';


export class ScheduleItem {
  _id: string;
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
  5: boolean;
  6: boolean;
  7: boolean;
  begin_time: string;
  end_time: string;
  desired_temp: number;
  active: boolean;

  set(item: ScheduleItem){
    this[1] = item[1];
    this[2] = item[2];
    this[3] = item[3];
    this[4] = item[4];
    this[5] = item[5];
    this[6] = item[6];
    this[7] = item[7];
    this['begin_time'] = item['begin_time'];
    this['end_time'] = item['end_time'];
    this['desired_temp'] = item['desired_temp'];
    this['active'] = item['active'];
  }
}


@Injectable()
export class ScheduleService {

  private connectionUrl = this.connectionService.getBaseUrl()+"schedule";
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

    return this.http.get<Array<ScheduleItem>>(this.connectionUrl, this.httpOptions);

  }

}
