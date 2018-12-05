import {
  Injectable,
} from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '../helper/http-client.service';

import { Category } from '../class/category.class';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { CONFIGPROD } from '../config/config.constant';

@Injectable()
export class CategoryService {
  private url: string = CONFIGPROD.url;

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Category[]> {
    let query: string = `${this.url}/categories`;
    return this.http.get(query)
      .map((res: Response) => {
        const data = res.json();
        return data.map((obj1: any) => new Category(obj1));
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });
  }

  getByUsername(name: string): Observable<Category> {
    let query: string = `${this.url}/categories/${name}`;
    return this.http.get(query)
      .map((res: Response) => {
        const data = res.json();
        return new Category(data);
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });
  }

}

