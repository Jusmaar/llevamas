import {
  Injectable,
} from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '../helper/http-client.service';

import { Client, AuthClient } from '../class/client.class';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { CONFIGPROD } from '../config/config.constant';

@Injectable()
export class ClientService {
  private url: string = CONFIGPROD.url;
  public modal: boolean = false;

  constructor(
    private http: HttpClient,
    private raizHttp: Http
  ) { }

  register(obj: any): Observable<Client> {
    let query: string = `${this.url}/clientes`;
    let data = JSON.stringify(obj);
    return this.http.post(query, data)
      .map((res: Response) => {
        const data1 = res.json();
        return new Client(data1);
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });
  }

  login(obj: any): Observable<AuthClient> {
    let query: string = `${this.url}/login`;
    let data = JSON.stringify(obj);
    return this.http.post(query, data)
      .map((res: Response) => {
        const data1 = res.json();
        return new AuthClient(data1);
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });
  }

  suscriptor(obj: any): Observable<any> {
    let query: string = `${this.url}/suscriptor`;
    let data = JSON.stringify(obj);
    return this.http.post(query, data)
      .map((res: Response) => {
        const data1 = res.json();
        return data1;
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });
  }

  activar() {
    this.modal = true;
  }

  desactivar() {
    this.modal = false;
  }

  get(): boolean {
    return this.modal
  }

}

