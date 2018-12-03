import { Injectable } from '@angular/core';


@Injectable()
export class ConnectionService {
  private baseUrl: string = "xxxxxxxxxxxxxxxxxxxxx";
  private apiKey: string = "xxxxxxxxxxxxxxxxxxxxxx";


  constructor() {
  }

  getBaseUrl() : string{
    return this.baseUrl;
  }

  getApiKey() : string{
    return this.apiKey;
  }


}
