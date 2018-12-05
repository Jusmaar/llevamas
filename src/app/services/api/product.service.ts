import {
  Injectable,
} from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '../helper/http-client.service';

import { Product } from '../class/product.class';
import { Banner } from '../class/banner.class';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { CONFIGPROD } from '../config/config.constant';

@Injectable()
export class ProductService {
  private url: string = CONFIGPROD.url;

  constructor(
    private http: HttpClient
  ) { }

  get(obj?: any): Observable<Product[]> {
    let query: string;
    if (!obj) {
      query = `${this.url}/productos`;
    } else {
      query = `${this.url}/productos?destacado=${obj.destacado}`
    }
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
  }

  getByCategory(username: string): Observable<Product[]> {
    let query: string = `${this.url}/productos/category/${username}`;
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
  }

  getBySearch(text: string): Observable<Product[]> {
    let query: string = `${this.url}/productos/search/${text}`;
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
  }

  getByUsername(username: string): Observable<Product> {
    let query: string = `${this.url}/productos/${username}`;
    return this.http.get(query)
      .map((res: Response) => {
        const data = res.json();
        return new Product(data);
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });
  }

  getBanner(): Observable<Banner[]> {
    let query: string = `${this.url}/banners`;
    return this.http.get(query)
      .map((res: Response) => {
        const data = res.json();
        return data.map((obj1: any) => new Banner(obj1));
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

