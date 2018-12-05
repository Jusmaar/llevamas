import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { UserAuthService } from '../helper/user-auth.service';

@Injectable()
export class HttpAuth {

  constructor(
    private http: Http,
    private service: UserAuthService
  ) { }

  createAuthorizationHeader(headers: Headers): RequestOptions {
    headers.append('Authorization', `bearer ${this.service.getStatic().token}`);
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  createAuthorizationHeader1(headers: Headers): RequestOptions {
    headers.append('Authorization', `bearer ${this.service.getStatic().token}`);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  get(url: string): Observable<Response> {
    const headers = new Headers();
    const options = this.createAuthorizationHeader1(headers);
    return this.http.get(url, options);
  }

  post(url: string, data: string): Observable<Response> {
    const headers = new Headers();
    const options = this.createAuthorizationHeader(headers);
    console.log('options: ', options);
    return this.http.post(url, data, options);
  }

  delete(url: string): Observable<Response> {
    const headers = new Headers();
    const options = this.createAuthorizationHeader1(headers);
    return this.http.delete(url, options);
  }

  put(url: string, data: string): Observable<Response> {
    const headers = new Headers();
    const options = this.createAuthorizationHeader(headers);
    return this.http.put(url, data, options);
  }

}
