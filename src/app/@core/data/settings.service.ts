import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../../@core/utils/connection.service';

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
