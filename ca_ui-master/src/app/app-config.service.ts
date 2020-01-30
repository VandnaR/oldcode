import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as configuration from './../assets/config/configuration';

@Injectable()
export class AppConfigService {
  constructor(private http: HttpClient) {
    
  }

  async loadAppConfig() {
    const data = await this.http.get('/assets/config/config.json')
          .toPromise();
    configuration.setConfig(data);
  }
}