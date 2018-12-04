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

  setItem(f1:boolean,f2:boolean,f3:boolean,f4:boolean,f5:boolean,f6:boolean,f7:boolean,bt: string,et: string,dt: number,act: boolean){
    this[1]=f1;this[2]=f2;this[3]=f3;this[4]=f4;this[5]=f5;this[6]=f6;this[7]=f7;
    this['begin_time']=bt;this['end_time']=et;this['desired_temp']=dt;this['active']=act;
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
    //return this.http.get(this.connectionUrl,this.httpOptions);
    var aux: Array<ScheduleItem> = [];
    var aux_item = new ScheduleItem();
    aux_item.setItem(true,true,true,true,true,false,false,'1970-01-01T10:30:00.000Z','1970-01-01T11:45:00.000Z',23.5,true);
    aux.push(aux_item);
    aux_item = new ScheduleItem();
    aux_item.setItem(false,false,false,false,false,true,true,'1970-01-01T08:30:00.000Z','1970-01-01T18:45:00.000Z',23.5,false);
    aux.push(aux_item);
    aux_item = new ScheduleItem();
    aux_item.setItem(false,false,false,true,true,true,false,'1970-01-01T05:30:00.000Z','1970-01-01T07:45:00.000Z',20,true);
    aux.push(aux_item);

    return aux;

  }

}
