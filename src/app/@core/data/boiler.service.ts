import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../../@core/utils/connection.service';

export class BoilerItem {
  _id: string;
  boiler_on: boolean;
  flag_on: boolean;

  set(item: BoilerItem) {
    this._id = item._id;
    this.boiler_on = item.boiler_on;
    this.flag_on = item.flag_on;
  }
}

@Injectable()
export class BoilerService {

  private connectionUrl = this.connectionService.getBaseUrl() + 'boiler';
  private httpOptions = {
    headers: new HttpHeaders({
      'cache-control': 'no-cache',
      'x-apikey': this.connectionService.getApiKey(),
      'Content-Type':  'application/json',
    }),
  };


  constructor(private http: HttpClient, private connectionService: ConnectionService) {
  }


  getData() {
    return this.http.get<Array<BoilerItem>>(this.connectionUrl, this.httpOptions);
  }

  postData(body) {
    return this.http.post(this.connectionUrl, this.httpOptions, body);
  }

}
