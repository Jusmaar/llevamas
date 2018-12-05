import {
  Injectable,
} from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { HttpAuth } from '../helper/http-auth.service';

import { Bill } from '../class/bill.class';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { CONFIGPROD } from '../config/config.constant';

@Injectable()
export class BillService {
  private url: string = CONFIGPROD.url;

  constructor(
    private http: HttpAuth,
    private raizHttp: Http
  ) { }

  getTokenCulqi(obj: any): Observable<any> {
    let query: string = `https://api.culqi.com/v2/tokens`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${CONFIGPROD.culqi}`);
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const options = new RequestOptions({ headers: headers });
    let data = JSON.stringify(obj);
    return this.raizHttp.post(query, data, options)
      .map((res: Response) => {
        const data1 = res.json();
        return data1
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });;
  }

  /* CAMBIAR A HTTPAUTH */
  create(obj: any): Observable<Bill> {
    let query: string = `${this.url}/bills`;
    let data = JSON.stringify(obj);
    return this.http.post(query, data)
      .map((res: Response) => {
        const data1 = res.json();
        return new Bill(data1);
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });
  }

  /* get(): Observable<Product[]> {
    let query: string = `${this.url}/productos`;
    return this.http.get(query)
      .map((res: Response) => {
        const data = res.json();
        return data.map((obj1: any) => new Product(obj1));
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });
  } */

}

