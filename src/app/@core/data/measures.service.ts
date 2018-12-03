import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../../@core/utils/connection.service';

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
    return this.http.get(this.connectionUrl,this.httpOptions);
  }
}
